<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Dove andare', 'parent_id' => null],
            ['name' => 'Svago', 'parent_id' => null],
            // ['name' => 'Itinerario', 'parent_id' => null],

            #Parent id1
            ['name' => 'Centro storico e monumenti', 'parent_id' => 1],
            ['name' => 'Arte e cultura', 'parent_id' => 1],
            ['name' => 'Siti storici e archeologici', 'parent_id' => 1],
            ['name' => 'Teatri', 'parent_id' => 1],
            ['name' => 'Panorami e parchi', 'parent_id' => 1],
            ['name' => 'Quartieri e piazze', 'parent_id' => 1],
            ['name' => 'Mangiare e bere', 'parent_id' => 1],

            #Parent id2
            ['name' => 'Tradizioni ed eventi', 'parent_id' => 2],
            ['name' => 'Mercati tradizionali', 'parent_id' => 2],
            ['name' => 'Shopping', 'parent_id' => 2],
            ['name' => 'Centri commerciali', 'parent_id' => 2],
            ['name' => 'Sport, stadi e palazzetti', 'parent_id' => 2],
            ['name' => 'Spiagge', 'parent_id' => 2],
            ['name' => 'Tragitti in barca', 'parent_id' => 2],

            #Parent id3
            // ['name' => '1 giorno a Napoli', 'parent_id' => 3],
            // ['name' => '3 giorni a Napoli', 'parent_id' => 3],
            // ['name' => '7 giorni a Napoli', 'parent_id' => 3],
            // ['name' => 'Escursioni', 'parent_id' => 3],
        ]);

        
    }
}
