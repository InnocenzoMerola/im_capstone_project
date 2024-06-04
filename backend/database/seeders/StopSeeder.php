<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Guide;
use App\Models\Stop;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Stop::create([
            'name' => 'Maschio Angioino',
            'description_it' => "Una grande opera d'arte",
            'location' => 'Napoli',
        ]);

        Stop::create([
            'name' => 'Quartieri Spagnoli',
            'description_it' => "Simbolo di Napoli",
            'location' => 'Napoli',
        ]);

        Stop::create([
            'name' => 'Ischia',
            'description_it' => "La grande isola",
            'location' => 'Ischia',
        ]);

        Stop::factory(5)->create();

        $guides = Guide::all()->all();
        $stops_ids = Stop::all()->pluck('id')->all();

        foreach ($guides as $guide) {
            $stops_for_guide = fake()->randomElements($stops_ids, rand(1, count($stops_ids)));
            foreach ($stops_for_guide as $stop_id) {
                $guide->stops()->attach($stop_id);
            }
        }

        $categories = Category::all()->all();
        // $categories_ids = Category::all()->pluck('id')->all();

        foreach ($categories as $category) {
            $stops_for_categories = fake()->randomElements($stops_ids, rand(1, count($stops_ids)));
            foreach ($stops_for_categories as $stop_id) {
                $category->stops()->attach($stop_id);
            }
        }
    }
}
