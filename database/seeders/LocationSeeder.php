<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    public function run()
    {
        $zones = range('A', 'I'); // الحروف A-H
        $depths = range(1, 13);  // الأعماق 1-13
        $heights = range(1, 6);  // الارتفاعات 1-6

        foreach ($zones as $zone) {
            foreach ($depths as $depth) {
                foreach ($heights as $height) {
                    Location::create([
                        'zone' => $zone,
                        'depth' => $depth,
                        'height' => $height,
                        'full_location' => "{$zone}{$depth}H{$height}"
                    ]);
                }
            }
        }
    }
}

