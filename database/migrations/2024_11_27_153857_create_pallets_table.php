<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pallets', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->float('length')->default(120); // الطول
            $table->float('width')->default(100);  // العرض
            $table->float('max_height')->nullable(); // أقصى ارتفاع (يمكن أن يكون متغيرًا)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pallets');
    }
};
