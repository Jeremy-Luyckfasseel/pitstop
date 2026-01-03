<?php

declare(strict_types=1);

use App\Models\Reply;
use App\Models\Thread;
use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('authenticated users can reply to threads', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create();

    $this->actingAs($user)
        ->post("/forum/{$thread->id}/replies", [
            'body' => 'This is my reply to the thread.',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('replies', [
        'body' => 'This is my reply to the thread.',
        'thread_id' => $thread->id,
        'user_id' => $user->id,
    ]);
});

test('guests cannot reply to threads', function () {
    $thread = Thread::factory()->create();

    $this->post("/forum/{$thread->id}/replies", [
        'body' => 'Guest reply',
    ])->assertRedirect('/login');
});

test('reply authors can update their replies', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create();
    $reply = Reply::factory()->for($thread)->for($user, 'author')->create();

    $this->actingAs($user)
        ->put("/replies/{$reply->id}", [
            'body' => 'Updated reply content.',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('replies', [
        'id' => $reply->id,
        'body' => 'Updated reply content.',
    ]);
});

test('users cannot update replies they do not own', function () {
    $author = User::factory()->create();
    $otherUser = User::factory()->create();
    $thread = Thread::factory()->create();
    $reply = Reply::factory()->for($thread)->for($author, 'author')->create();

    $this->actingAs($otherUser)
        ->put("/replies/{$reply->id}", [
            'body' => 'Hacked reply.',
        ])
        ->assertForbidden();
});

test('reply authors can delete their replies', function () {
    $user = User::factory()->create();
    $thread = Thread::factory()->create();
    $reply = Reply::factory()->for($thread)->for($user, 'author')->create();

    $this->actingAs($user)
        ->delete("/replies/{$reply->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('replies', [
        'id' => $reply->id,
    ]);
});

test('admins can delete any reply', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $user = User::factory()->create();
    $thread = Thread::factory()->create();
    $reply = Reply::factory()->for($thread)->for($user, 'author')->create();

    $this->actingAs($admin)
        ->delete("/replies/{$reply->id}")
        ->assertRedirect();

    $this->assertDatabaseMissing('replies', [
        'id' => $reply->id,
    ]);
});
