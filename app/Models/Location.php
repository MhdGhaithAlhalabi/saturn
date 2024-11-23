<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = ['zone', 'depth', 'height', 'full_location'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_locations')
            ->withPivot(['quantity'])
            ->withTimestamps();
    }
}
