<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Location;
use App\Models\ProductLocation;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    public function log()
    {
        // جلب السجلات من قاعدة البيانات
        $logs = DB::table('adjustment_logs')
            ->join('products', 'adjustment_logs.product_id', '=', 'products.id')
            ->join('locations', 'adjustment_logs.location_id', '=', 'locations.id')
            ->select(
                'adjustment_logs.*',
                'products.name as product_name',
                'locations.full_location as location_name'
            )
            ->orderBy('adjustment_logs.created_at', 'desc')
            ->paginate(10); // تقسيم النتائج إذا كانت كبيرة

        // إرسال السجلات إلى Inertia
        return Inertia('Logs/Index', [
            'logs' => $logs,
        ]);
    }

    public function index()
    {
        $products = Product::with('locations')->get();
        // dd($products[1]);
        $products = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'code' => $product->code,
                'name' => $product->name,
                //'name_de' => $product->name_de,
                //'additional_info' => $product->additional_info,
                //'boxes_per_pallet' => $product->boxes_per_pallet,
                'total_quantity' => $product->locations->sum('pivot.quantity'), // احتساب الكمية الإجمالية
                'locations' => $product->locations,
            ];
        });
        return inertia('Products/Index', [
            'products' => $products,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json(['error' => 'Query parameter is required'], 400);
        }

        $results = Product::where('name', 'like', '%' . $query . '%')
            ->orWhere('code', 'like', '%' . $query . '%')
            ->orWhereHas('locations', function ($q) use ($query) {
                $q->where('full_location', 'like', '%' . $query . '%');
            })
            ->with('locations') // تحميل اللوكيشنات المرتبطة بالمنتج
            ->get();

        if ($results->isEmpty()) {
            return response()->json(['message' => 'No results found.'], 200); // عند عدم وجود نتائج
        }

        return response()->json($results);
    }



    public function create()
    {
        return inertia('Products/CreateProduct');
    }

    public function store(Request $request)
    {
        try {
            // التحقق من صحة البيانات
            $validatedData = $request->validate([
                'products' => 'required|array',
                'products.*.code' => 'required|string',
                'products.*.name' => 'nullable|string',
                'products.*.locations' => 'nullable|array', // جعل المواقع اختيارية
                'products.*.locations.*.full_location' => 'required_with:products.*.locations|exists:locations,full_location',
                'products.*.locations.*.quantity' => 'required_with:products.*.locations|integer|min:1',
            ]);
    
            foreach ($validatedData['products'] as $productData) {
                // البحث عن المنتج بناءً على الكود
                $product = Product::where('code', $productData['code'])->first();
    
                if (!$product) {
                    // إذا لم يكن المنتج موجودًا، يتم إنشاؤه
                    $product = Product::create([
                        'code' => $productData['code'],
                        'name' => $productData['name'] ?? null,
                    ]);
                }
    
                // التحقق من وجود المواقع قبل إضافتها
                if (!empty($productData['locations'])) {
                    foreach ($productData['locations'] as $location) {
                        // البحث عن الموقع بناءً على full_location
                        $locationRecord = Location::where('full_location', $location['full_location'])->first();
    
                        if (!$locationRecord) {
                            throw new \Exception("Invalid location: {$location['full_location']}");
                        }
    
                        // تحديث الكمية أو إنشاؤها إذا لم تكن موجودة
                        ProductLocation::updateOrCreate(
                            [
                                'product_id' => $product->id,
                                'location_id' => $locationRecord->id,
                            ],
                            [
                                'quantity' => $location['quantity'],
                            ]
                        );
                    }
                }
            }
    
            return redirect()->route('items.index')->with('success', 'Products processed successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            // عرض الأخطاء عند فشل التحقق
            return back()->withErrors($e->errors())->with('error', 'Validation errors occurred.');
        } catch (\Exception $e) {
            // عرض الأخطاء عند حدوث استثناء عام
            return back()->with('error', 'Failed to process products: ' . $e->getMessage());
        }
    }
    


    public function adjustQuantity(Request $request)
{
    // التحقق من صحة البيانات
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'location_id' => 'required|exists:locations,id',
        'quantity' => 'required|integer|min:1',
        'reason' => 'nullable|string',
        'adjustment_date' => 'nullable|date',
    ]);

    // جلب البيانات الحالية
    $productLocation = ProductLocation::where('product_id', $request->product_id)
        ->where('location_id', $request->location_id)
        ->firstOrFail();

    $product = Product::findOrFail($request->product_id);
    $location = Location::findOrFail($request->location_id);

    $oldQuantity = $productLocation->quantity;

    // تحديث البيانات
    $productLocation->quantity = $request->quantity;
    $productLocation->save();

    // تخزين السجل في جدول السجلات
    DB::table('adjustment_logs')->insert([
        'product_id' => $request->product_id, // يبقى مرتبطًا بالمنتج إذا لزم الأمر
        'product_name' => $product->name, // تخزين اسم المنتج
        'location_id' => $request->location_id, // يبقى مرتبطًا بالموقع إذا لزم الأمر
        'full_location' => $location->full_location, // تخزين الموقع النصي
        'old_quantity' => $oldQuantity,
        'new_quantity' => $request->quantity,
        'adjustment_reason' => $request->reason,
        'adjustment_date' => $request->adjustment_date ?? now(),
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return redirect()->route('items.index')->with('success', 'Quantity adjusted and log stored successfully.');
}

    public function destroy(Product $product)
    {

        $product->delete();
        return redirect()->route('items.index')->with('success', 'Item deleted successfully.');
    }
}
