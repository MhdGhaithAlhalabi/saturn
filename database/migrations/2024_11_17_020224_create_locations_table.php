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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->char('zone', 1); // الحرف (A-H)
            $table->unsignedTinyInteger('depth'); // العمق (1-13)
            $table->unsignedTinyInteger('height'); // الارتفاع (1-6)
            $table->string('full_location')->unique(); // اللوكيشن الكامل (مثلاً A1H3)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
