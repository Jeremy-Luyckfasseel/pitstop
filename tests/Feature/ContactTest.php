<?php

declare(strict_types=1);

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests can view contact page', function () {
    $this->get('/contact')
        ->assertOk()
        ->assertInertia(
            fn($page) => $page
                ->component('contact')
        );
});

test('guests can submit contact form', function () {
    $response = $this->post('/contact', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Test Subject',
        'message' => 'This is a test message for the contact form.',
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('success');
});

test('contact form requires all fields', function () {
    $response = $this->post('/contact', []);

    $response->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
});

test('contact form validates email format', function () {
    $response = $this->post('/contact', [
        'name' => 'John Doe',
        'email' => 'not-an-email',
        'subject' => 'Test Subject',
        'message' => 'This is a test message.',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('contact form validates message length', function () {
    $longMessage = str_repeat('a', 5001);

    $response = $this->post('/contact', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Test Subject',
        'message' => $longMessage,
    ]);

    $response->assertSessionHasErrors(['message']);
});
