<?php

namespace Database\Seeders;
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
            'name' => 'Mario',
            'email' => 'mario@mario.mario',
            'profile_img' => null,
            'role' => 'admin',
            'surname' => 'Rossi',
            'phone' => '123456789',
            'age' => 50,
        ]);

        User::factory(5)->create();
    }
}
