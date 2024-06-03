<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Guide;
use App\Models\Slot;
use App\Models\Stop;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuideSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $stop_ids = Stop::all()->pluck('id')->all();
        Guide::create([
            'name_it' => 'In giro per i Quartieri Spagnoli',
            'date' => '2024/05/21',
            'price' => 5.50,
            'mobility' => 'Nessun mezzo',
            'duration' => '2 giorni',
        ]);

        Guide::create([
            'name_it' => 'Alla scoperta del Maschio Angioino',
            'date' => '2024/05/21',
            'price' => 6.00,
            'mobility' => 'Nessun mezzo',
            'duration' => '1 giorno',
        ]);

        Guide::create([
            'name_it' => "L'isola del panorama",
            'date' => '2024/05/21',
            'price' => 50.00,
            'mobility' => 'Traghetto',
            'duration' => '3 giorni',
        ]);

        // Guide::factory(5)->create();
        $users = User::all()->all();
        $guides_ids = Guide::all()->pluck('id')->all();

        foreach ($users as $user) {
            $guides_for_user = fake()->randomElements($guides_ids, rand(1, count($guides_ids)));
            foreach ($guides_for_user as $guide_id) {
                $user->guides()->attach($guide_id, ['status' => 'pending']);
            }
        }

        
        $guides = Guide::all()->all();
        $slots_ids = Slot::all()->pluck('id')->all();

        foreach ($guides as $guide) {
            $slots_for_guide = fake()->randomElements($slots_ids, rand(1, count($slots_ids)));
            foreach ($slots_for_guide as $slot_id) {
                $guide->slots()->attach($slot_id);
            }
        }
    }
}
