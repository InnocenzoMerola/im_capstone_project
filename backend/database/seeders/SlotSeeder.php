<?php

namespace Database\Seeders;

use App\Models\Guide;
use App\Models\Slot;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Slot::create([
        //     'date' => '2024-06-12'
        // ]);

        // Slot::create([
        //     'date' => '2024-06-21'
        // ]);

        // Slot::factory(15)->create();



        // $guides = Guide::all()->all();
        // $slots_ids = Slot::all()->pluck('id')->all();

        // foreach ($guides as $guide) {
        //     $slots_for_guide = fake()->randomElements($slots_ids, rand(1, count($slots_ids)));
        //     foreach ($slots_for_guide as $slot_id) {
        //         $guide->slots()->attach($slot_id);
        //     }
        // }
    }
}
