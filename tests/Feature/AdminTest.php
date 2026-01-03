<?php

declare(strict_types=1);

use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests cannot access admin dashboard', function () {
    $this->get('/admin/dashboard')
        ->assertRedirect('/login');
});

test('regular users cannot access admin dashboard', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get('/admin/dashboard')
        ->assertForbidden();
});

test('admins can access admin dashboard', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)
        ->get('/admin/dashboard')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('admin/dashboard')
                ->has('stats')
        );
});

test('admins can view user list', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    User::factory()->count(5)->create();

    $this->actingAs($admin)
        ->get('/admin/users')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('admin/users/index')
                ->has('users.data', 6) // 5 + admin
        );
});

test('admins can promote users to admin', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($admin)
        ->post("/admin/users/{$user->id}/promote")
        ->assertRedirect();

    $user->refresh();
    expect($user->is_admin)->toBeTrue();
});

test('admins can demote other admins', function () {
    $superAdmin = User::factory()->create(['is_admin' => true]);
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($superAdmin)
        ->post("/admin/users/{$admin->id}/demote")
        ->assertRedirect();

    $admin->refresh();
    expect($admin->is_admin)->toBeFalse();
});

test('admins cannot demote themselves', function () {
    $admin = User::factory()->create(['is_admin' => true]);

    $this->actingAs($admin)
        ->post("/admin/users/{$admin->id}/demote")
        ->assertRedirect()
        ->assertSessionHas('error');

    $admin->refresh();
    expect($admin->is_admin)->toBeTrue();
});

test('regular users cannot access admin users page', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get('/admin/users')
        ->assertForbidden();
});
