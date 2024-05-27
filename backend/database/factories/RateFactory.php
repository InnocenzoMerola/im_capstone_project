<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rate>
 */
class RateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'comment' => fake()->words(rand(5, 15), true),
            'rate' => rand(1, 5),
            'user_id' => rand(1, 3),
            'stop_id' => rand(1, 3)
        ];
    }
}
