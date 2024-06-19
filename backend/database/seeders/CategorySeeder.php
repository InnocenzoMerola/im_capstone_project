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
            [
                'name_it' => 'Dove andare', 
                'name_en' => 'Where to go',
                'name_fr' => 'Où aller',
                'name_sp' => 'Dónde ir',
                'parent_id' => null
            ],
            [
                'name_it' => 'Svago', 
                'name_en' => 'Entertainment',
                'name_fr' => 'Divertissement',
                'name_sp' => 'Entretenimiento',
                'parent_id' => null
            ],
         

            #Parent id1
            [
                'name_it' => 'Centro storico e monumenti', 
                'name_en' => 'Historic center and monuments',
                'name_fr' => 'Centre historique et monuments',
                'name_sp' => 'Centro histórico y monumentos',
                'parent_id' => 1
            ],
            [
                'name_it' => 'Arte e cultura',
                'name_en' => 'Art and culture',
                'name_fr' => 'Art et culture',
                'name_sp' => 'Arte y cultura',
                'parent_id' => 1
            ],
            [
                'name_it' => 'Siti storici e archeologici',
                'name_en' => 'Historical and archaeological sites',
                'name_fr' => 'Sites historiques et archéologiques',
                'name_sp' => 'Sitios históricos y arqueológicos',
                'parent_id' => 1
            ],
            [
                'name_it' => 'Teatri',
                'name_en' => 'Theaters',
                'name_fr' => 'Théâtres',
                'name_sp' => 'Teatros',
                'parent_id' => 1
            ],
            [
                'name_it' => 'Panorami e parchi',
                'name_en' => 'Views and parks',
                'name_fr' => 'Panoramas et parcs',
                'name_sp' => 'Panoramas y parques',
                'parent_id' => 1
            ],
            [
                'name_it' => 'Quartieri e piazze',
                'name_en' => 'Neighborhoods and squares',
                'name_fr' => 'Quartiers et places',
                'name_sp' => 'Barrios y plazas',
                'parent_id' => 1
            ],
            [
                'name_it' => 'Mangiare e bere',
                'name_en' => 'Eating and drinking',
                'name_fr' => 'Manger et boire',
                'name_sp' => 'Comer y beber',
                'parent_id' => 1
            ],

            #Parent id2
            [
                'name_it' => 'Tradizioni ed eventi',
                'name_en' => 'Traditions and events',
                'name_fr' => 'Traditions et événements',
                'name_sp' => 'Tradiciones y eventos',
                'parent_id' => 2
            ],
            [
                'name_it' => 'Centri commerciali',
                'name_en' => 'Shopping malls',
                'name_fr' => 'Centres commerciaux',
                'name_sp' => 'Centros comerciales',
                'parent_id' => 2
            ],
            [
                'name_it' => 'Sport, stadi e palazzetti',
                'name_en' => 'Sports, stadiums, and arenas',
                'name_fr' => 'Sports, stades et arénas',
                'name_sp' => 'Deportes, estadios y arenas',
                'parent_id' => 2
            ],
            [
                'name_it' => 'Spiagge',
                'name_en' => 'Beaches',
                'name_fr' => 'Plages',
                'name_sp' => 'Playas',
                'parent_id' => 2
            ],
            [
                'name_it' => 'Tragitti in barca',
                'name_en' => 'Boat tours',
                'name_fr' => 'Tours en bateau',
                'name_sp' => 'Recorridos en barco',
                'parent_id' => 2
            ],
            
        ]);

        
    }
}
