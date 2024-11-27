<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Pest\Laravel\json;

class OrderController extends Controller
{
    public function index()
    {
        return inertia('Order/index');
    }

    public function getProductDetails($code)
    {
        // البحث عن المنتج بالكود
        $product = Product::where('code', $code)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // التحقق من وجود أبعاد المنتج أو أبعاد البوكس
        if ($product->box) {
            // إذا كان المنتج مرتبطًا ببوكس، جلب الأبعاد من البوكس
            $dimensions = [
                'length' => $product->box->length,
                'width' => $product->box->width ,
                'height' => $product->box->height,
            ];
        } else {
            // إذا كان المنتج يحتوي على الأبعاد الخاصة به
            $dimensions = [
                'length' => $product->length,
                'width' => $product->width,
                'height' => $product->height,
            ];
        }

        // إعادة البيانات إلى الواجهة
        return response()->json([
            'name' => $product->name,
            'dimensions' => $dimensions,
        ]);
    }



    public function calculatePallets(Request $request)
    {
        $validatedData = $request->validate([
            'products' => 'required|array',
            'products.*.code' => 'required|string',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        $products = $validatedData['products'];

        $productDetails = [];

        foreach ($products as $product) {
            // جلب المنتج من قاعدة البيانات
            $productRecord = Product::with('box')->where('code', $product['code'])->first();

            if (!$productRecord) {
                return response()->json(['error' => "Product code {$product['code']} not found"], 404);
            }

            // استخدام أبعاد البوكس إذا كان مرتبطًا بالمنتج
            if ($productRecord->box) {
                $dimensions = [
                    'length' => $productRecord->box->length,
                    'width' => $productRecord->box->width,
                    'height' => $productRecord->box->height,
                ];
            } else {
                // استخدام أبعاد المنتج إذا لم يكن له بوكس
                $dimensions = [
                    'length' => $productRecord->length,
                    'width' => $productRecord->width,
                    'height' => $productRecord->height,
                ];
            }

            $productDetails[] = [
                'code' => $productRecord->code,
                'name' => $productRecord->name,
                'quantity' => $product['quantity'],
                'dimensions' => $dimensions,
            ];
        }

        // استدعاء الخوارزمية لتوزيع المنتجات على الطبليات
        $palletDimensions = [
            'length' => 120, // الطول الافتراضي للطبلية
            'width' => 100,  // العرض الافتراضي للطبلية
            'max_height' => 150, // أقصى ارتفاع للطبلية
        ];

        $pallets = $this->distributeProductsToPallets($productDetails, $palletDimensions);

        return response()->json($pallets, 200);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'products' => 'required|array',
            'products.*.code' => 'required|string',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Process and save the order
        return redirect()->route('orders.index')->with('success', 'Order created successfully!');
    }

    private function distributeProductsToPallets($products, $palletDimensions)
{
    $pallets = []; // قائمة الطبليات
    $currentPallet = [
        'layers' => [], // لتتبع الطبقات في الطبلية
        'current_height' => 0,
    ];

    foreach ($products as $product) {
        $length = $product['dimensions']['length'] ?? null;
        $width = $product['dimensions']['width'] ?? null;
        $height = $product['dimensions']['height'] ?? null;

        if (!$length || !$width || !$height) {
            throw new \Exception("Invalid dimensions for product: " . ($product['code'] ?? 'Unknown'));
        }

        for ($i = 0; $i < $product['quantity']; $i++) {
            $placed = false;

            // حاول وضع البوكس في الطبقات الموجودة
            foreach ($currentPallet['layers'] as &$layer) {
                if (
                    $layer['remaining_length'] >= $length &&
                    $layer['remaining_width'] >= $width
                ) {
                    $layer['items'][] = [
                        'name' => $product['code'],
                        'quantity' => 1,
                    ];
                    $layer['remaining_length'] -= $length;
                    $placed = true;
                    break;
                }
            }

            // إذا لم يتم وضع البوكس في الطبقات الموجودة
            if (!$placed) {
                if (
                    ($currentPallet['current_height'] + $height) > $palletDimensions['max_height']
                ) {
                    $pallets[] = $currentPallet;
                    $currentPallet = [
                        'layers' => [],
                        'current_height' => 0,
                    ];
                }

                // إضافة طبقة جديدة
                $currentPallet['layers'][] = [
                    'remaining_length' => $palletDimensions['length'],
                    'remaining_width' => $palletDimensions['width'],
                    'items' => [
                        [
                            'name' => $product['code'],
                            'quantity' => 1,
                        ],
                    ],
                ];
                $currentPallet['current_height'] += $height;
            }
        }
    }

    if (!empty($currentPallet['layers'])) {
        $pallets[] = $currentPallet;
    }

    // تحسين إخراج الطبليات
    $formattedPallets = [];
    foreach ($pallets as $palletIndex => $pallet) {
        $formattedItems = [];

        foreach ($pallet['layers'] as $layer) {
            foreach ($layer['items'] as $item) {
                if (isset($formattedItems[$item['name']])) {
                    $formattedItems[$item['name']]['quantity'] += $item['quantity'];
                } else {
                    $formattedItems[$item['name']] = [
                        'name' => $item['name'],
                        'quantity' => $item['quantity'],
                    ];
                }
            }
        }

        $formattedPallets[] = [
            'pallet' => $palletIndex + 1,
            'items' => array_values($formattedItems), // تحويل القيم فقط لواجهة React
        ];
    }

    return $formattedPallets;
}










}
