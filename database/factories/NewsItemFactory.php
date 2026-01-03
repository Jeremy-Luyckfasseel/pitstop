<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\NewsItem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NewsItem>
 */
class NewsItemFactory extends Factory
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
            'content' => fake()->paragraphs(5, true),
            'published_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the news item is unpublished.
     */
    public function unpublished(): static
    {
        return $this->state(fn(array $attributes) => [
            'published_at' => null,
        ]);
    }

    /**
     * Indicate that the news item is scheduled for the future.
     */
    public function scheduled(): static
    {
        return $this->state(fn(array $attributes) => [
            'published_at' => fake()->dateTimeBetween('+1 day', '+1 month'),
        ]);
    }
}
