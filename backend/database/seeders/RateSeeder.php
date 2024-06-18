<?php

namespace Database\Seeders;

use App\Models\Rate;
use App\Models\User;
use App\Models\Stop;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_ids = User::all()->pluck('id')->all();
        $stop_ids = Stop::all()->pluck('id')->all();

    //     Rate::create([
    //         'comment' => 'Posto meraviglioso',
    //         'rate' => 5,
    //         'user_id' => fake()->randomElement($user_ids),
    //         'stop_id' => fake()->randomElement($stop_ids)
    //     ]);
    //     Rate::create([
    //         'comment' => 'Bene ma non benissimo',
    //         'rate' => 3,
    //         'user_id' => fake()->randomElement($user_ids),
    //         'stop_id' => fake()->randomElement($stop_ids)
    //     ]);
    //     Rate::create([
    //         'comment' => 'Ottimo',
    //         'rate' => 4,
    //         'user_id' => fake()->randomElement($user_ids),
    //         'stop_id' => fake()->randomElement($stop_ids)
    //     ]);

    //    Rate::factory(5)->create();
    }
}
