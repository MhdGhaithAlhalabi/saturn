<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BoxSeeder extends Seeder
{
    public function run()
    {
        $boxes = [
            ['number' => 1, 'name' => 'Slack Adjuster D', 'length' => 23.5, 'width' => 10.5, 'height' => 7],
            ['number' => 2, 'name' => 'Thrust Washer', 'length' => 16, 'width' => 15, 'height' => 4],
            ['number' => 3, 'name' => 'Waterfilter', 'length' => 11.5, 'width' => 11.5, 'height' => 23],
            ['number' => 4, 'name' => 'Valve', 'length' => 10.5, 'width' => 9.5, 'height' => 6],
            ['number' => 5, 'name' => 'Cross Joint', 'length' => 16, 'width' => 16, 'height' => 7],
            ['number' => 6, 'name' => 'Brake Pad with Handle', 'length' => 22, 'width' => 17.5, 'height' => 2.5],
            ['number' => 7, 'name' => 'Oil Line', 'length' => 58.5, 'width' => 49, 'height' => 11],
            ['number' => 8, 'name' => 'Cross Joint SCANIA', 'length' => 20, 'width' => 20, 'height' => 10],
            ['number' => 9, 'name' => 'Shock Absorber SMALL', 'length' => 45, 'width' => 6.5, 'height' => 5.5],
            ['number' => 10, 'name' => 'Bolts', 'length' => 32, 'width' => 12, 'height' => 11],
            ['number' => 11, 'name' => 'Pump', 'length' => 16, 'width' => 16, 'height' => 14],
            ['number' => 12, 'name' => 'Brake Pad ACTROS', 'length' => 27, 'width' => 25, 'height' => 8],
            ['number' => 13, 'name' => 'Bolts Alternative', 'length' => 34, 'width' => 14, 'height' => 10],
            ['number' => 14, 'name' => 'Brake Pad DB', 'length' => 16.5, 'width' => 11.5, 'height' => 8],
            ['number' => 15, 'name' => 'Con Rod', 'length' => 72, 'width' => 15, 'height' => 26],
            ['number' => 16, 'name' => 'Oil Seperator', 'length' => 17, 'width' => 17, 'height' => 12],
            ['number' => 17, 'name' => 'Shock Absorber MAX', 'length' => 64, 'width' => 12.5, 'height' => 11.5],
            ['number' => 18, 'name' => 'Shock Absorber Big', 'length' => 18, 'width' => 6.5, 'height' => 5.5],
            ['number' => 19, 'name' => 'Brake Pad Peugeot', 'length' => 124, 'width' => 5.5, 'height' => 8],
            ['number' => 20, 'name' => 'Valve Guide 15A', 'length' => 10, 'width' => 8, 'height' => 5],
            ['number' => 21, 'name' => 'Water Pump', 'length' => 26, 'width' => 20, 'height' => 9],
            ['number' => 22, 'name' => 'Oil Cooler Housing', 'length' => 28, 'width' => 9, 'height' => 24],
        ];

        // إدخال البيانات في جدول boxes
        DB::table('boxes')->insert($boxes);
    }
}

