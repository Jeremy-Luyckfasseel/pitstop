<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Thread;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Thread>
 */
class ThreadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(),
            'body' => fake()->paragraphs(3, true),
            'is_pinned' => false,
        ];
    }

    /**
     * Indicate that the thread is pinned.
     */
    public function pinned(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_pinned' => true,
        ]);
    }
}
