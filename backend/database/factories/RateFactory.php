<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Stop;
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

        $user_ids = User::all()->pluck('id')->all();
        $stop_ids = Stop::all()->pluck('id')->all();

        return [
            'comment' => fake()->words(rand(5, 15), true),
            'rate' => rand(1, 5),
            'user_id' => fake()->randomElement($user_ids),
            'stop_id' => fake()->randomElement($stop_ids)
        ];
    }
}
