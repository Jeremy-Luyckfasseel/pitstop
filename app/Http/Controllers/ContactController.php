<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactFormMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Show the contact form.
     */
    public function create(): Response
    {
        return Inertia::render('contact');
    }

    /**
     * Process the contact form submission and send email.
     */
    public function store(StoreContactRequest $request): RedirectResponse
    {
        Mail::to(config('mail.admin_address', 'admin@ehb.be'))
            ->send(new ContactFormMail($request->validated()));

        return back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }
}
