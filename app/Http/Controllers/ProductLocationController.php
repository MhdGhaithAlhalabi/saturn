<?php

namespace App\Http\Controllers;

use App\Models\ProductLocation;
use Illuminate\Http\Request;

class ProductLocationController extends Controller
{
    public function adjustQuantity(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'location_id' => 'required|exists:locations,id',
            'quantity' => 'required|integer|min:1',
            'adjustment_reason' => 'nullable|string',
            'adjustment_date' => 'nullable|date',
        ]);

        $productLocation = ProductLocation::where('product_id', $request->product_id)
            ->where('location_id', $request->location_id)
            ->firstOrFail();

        $productLocation->quantity = $request->quantity;
        $productLocation->adjustment_reason = $request->adjustment_reason;

        $productLocation->save();

        return redirect()->route('items.index');
    }
}
