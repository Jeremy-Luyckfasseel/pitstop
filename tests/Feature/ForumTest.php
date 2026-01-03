<?php

declare(strict_types=1);

use App\Models\Thread;
use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to login when viewing forum index', function () {
    Thread::factory()->count(3)->create();

    $this->get('/forum')
        ->assertRedirect('/login');
});

test('authenticated users can view forum index', function () {
    $user = User::factory()->create();
    Thread::factory()->count(3)->create();

    $this->actingAs($user)
        ->get('/forum')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('forum/index')
                ->has('threads.data', 3)
        );
});

test('guests are redirected to login when viewing a thread', function () {
    $thread = Thread::factory()->create();

    $this->get("/forum/{$thread->id}")
        ->assertRedirect('/login');
});

test('authenticated users can view a single thread', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create();

    $this->actingAs($user)
        ->get("/forum/{$thread->id}")
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('forum/show')
                ->has('thread')
        );
});

test('authenticated users can create threads', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/forum', [
            'title' => 'Test Thread Title',
            'body' => 'This is a test thread body content.',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('threads', [
        'title' => 'Test Thread Title',
        'user_id' => $user->id,
    ]);
});

test('guests cannot create threads', function () {
    $this->post('/forum', [
        'title' => 'Test Thread',
        'body' => 'Test body',
    ])->assertRedirect('/login');
});

test('thread authors can update their threads', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->for($user, 'author')->create();

    $this->actingAs($user)
        ->put("/forum/{$thread->id}", [
            'title' => 'Updated Title',
            'body' => 'Updated body content.',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('threads', [
        'id' => $thread->id,
        'title' => 'Updated Title',
    ]);
});

test('users cannot update threads they do not own', function () {
    $author = User::factory()->create();
    $otherUser = User::factory()->create();
    $thread = Thread::factory()->for($author, 'author')->create();

    $this->actingAs($otherUser)
        ->put("/forum/{$thread->id}", [
            'title' => 'Hacked Title',
            'body' => 'Hacked body.',
        ])
        ->assertForbidden();
});

test('admins can pin threads', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $thread = Thread::factory()->create(['is_pinned' => false]);

    $this->actingAs($admin)
        ->post("/forum/{$thread->id}/pin")
        ->assertRedirect();

    $thread->refresh();
    expect($thread->is_pinned)->toBeTrue();
});

test('regular users cannot pin threads', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $thread = Thread::factory()->create(['is_pinned' => false]);

    $this->actingAs($user)
        ->post("/forum/{$thread->id}/pin")
        ->assertForbidden();
});
