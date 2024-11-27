<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name','length','width','height','box_id'];

    public function locations()
    {
        return $this->belongsToMany(Location::class, 'product_locations')
            ->withPivot(['quantity'])
            ->withTimestamps();
    }

    public function getTotalQuantityAttribute()
    {
        return $this->locations->sum('pivot.quantity');
    }
    public function box()
{
    return $this->belongsTo(Box::class,'box_id');
}



}
