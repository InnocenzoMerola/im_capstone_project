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
            ['name' => 'Cibo', 'parent_id' => null],
            ['name' => 'Spiagge', 'parent_id' => null],
            ['name' => 'Soggiorno', 'parent_id' => null],
            ['name' => 'Pizze', 'parent_id' => 1],
            ['name' => 'Carni', 'parent_id' => 1],
            ['name' => 'Fritti', 'parent_id' => 1],
            ['name' => 'Libera', 'parent_id' => 2],
            ['name' => 'Privata', 'parent_id' => 2],
            ['name' => 'Hotel', 'parent_id' => 3],
            ['name' => 'Appartamento', 'parent_id' => 3],
        ]);

        
    }
}
