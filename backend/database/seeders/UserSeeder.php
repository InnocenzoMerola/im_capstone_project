<?php

namespace Database\Seeders;

use App\Models\Guide;
use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Enzo',
            'surname' => 'Merola',
            'email' => 'enzo@enzo.com',
            'password' => bcrypt('Enzomerola'),
            'profile_img' => 'storage/profiles/profile_image.jpg',
            'role' => 'admin',
            'phone' => '123456789',
            'age' => 21,
        ]);

        User::factory(5)->create();

        // $users = User::all()->all();
        // $guides_ids = Guide::all()->pluck('id')->all();


        // foreach ($users as $user) {
        //     $guides_for_user = fake()->randomElements($guides_ids, rand(1, count($guides_ids)));
        //     foreach ($guides_for_user as $guide_id) {
        //         $user->courses()->attach($guide_id, ['status' => 'pending']);
        //     }
        // }
    }
}
