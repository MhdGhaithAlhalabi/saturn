<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('adjustment_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable(); // اختياري للاحتفاظ بالمرجع
            $table->string('product_name'); // اسم المنتج النصي
            $table->unsignedBigInteger('location_id')->nullable(); // اختياري للاحتفاظ بالمرجع
            $table->string('full_location'); // الموقع النصي
            $table->integer('old_quantity');
            $table->integer('new_quantity');
            $table->string('adjustment_reason')->nullable();
            $table->date('adjustment_date')->nullable();
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adjustment_logs');
    }
};
