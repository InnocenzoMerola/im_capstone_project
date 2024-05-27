<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guide>
 */
class GuideFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_it' => fake()->words(rand(1, 5), true),
            'date' => '2024/05/21',
            'price' => rand(2, 40),
            'mobility' => 'Autobus',
            'duration' => '2 giorni'
        ];
    }
}
