<?php

declare(strict_types=1);

use App\Models\NewsItem;
use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests can view news index', function () {
    NewsItem::factory()->count(3)->create();

    $this->get('/news')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('news/index')
        );
});

test('authenticated users can view news index', function () {
    $user = User::factory()->create();
    NewsItem::factory()->count(3)->create();

    $this->actingAs($user)
        ->get('/news')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('news/index')
        );
});

test('guests can view a single news item', function () {
    $newsItem = NewsItem::factory()->create();

    $this->get("/news/{$newsItem->id}")
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('news/show')
                ->has('newsItem')
        );
});

test('authenticated users can view a single news item', function () {
    $user = User::factory()->create();
    $newsItem = NewsItem::factory()->create();

    $this->actingAs($user)
        ->get("/news/{$newsItem->id}")
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('news/show')
                ->has('newsItem')
        );
});

test('admins can create news items', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    // Create a fake image for upload
    $image = \Illuminate\Http\UploadedFile::fake()->image('news.jpg', 640, 480);

    $this->actingAs($admin)
        ->post('/admin/news', [
            'title' => 'Breaking F1 News',
            'content' => 'This is important F1 news content.',
            'published_at' => now()->format('Y-m-d H:i'),
            'image' => $image,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('news_items', [
        'title' => 'Breaking F1 News',
        'user_id' => $admin->id,
    ]);
});

test('regular users cannot create news items', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->post('/admin/news', [
            'title' => 'Fake News',
            'content' => 'Content',
        ])
        ->assertForbidden();
});

test('admins can update news items', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $newsItem = NewsItem::factory()->for($admin, 'author')->create();

    $this->actingAs($admin)
        ->put("/admin/news/{$newsItem->id}", [
            'title' => 'Updated Title',
            'content' => 'Updated content.',
            'published_at' => now()->format('Y-m-d H:i'),
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('news_items', [
        'id' => $newsItem->id,
        'title' => 'Updated Title',
    ]);
});

test('admins can delete news items', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $newsItem = NewsItem::factory()->for($admin, 'author')->create();

    $this->actingAs($admin)
        ->delete("/admin/news/{$newsItem->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('news_items', [
        'id' => $newsItem->id,
    ]);
});
