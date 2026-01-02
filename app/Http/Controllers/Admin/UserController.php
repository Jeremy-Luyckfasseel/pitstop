<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of all users.
     */
    public function index(): Response
    {
        $users = User::latest()
            ->paginate(20)
            ->through(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'is_admin' => $user->is_admin,
                'created_at' => $user->created_at,
            ]);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        return Inertia::render('admin/users/create');
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'is_admin' => $request->boolean('is_admin'),
            'email_verified_at' => now(), // Auto-verify since admin created
        ]);

        return to_route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Promote a user to admin.
     */
    public function promote(User $user): RedirectResponse
    {
        // Prevent self-demotion protection
        if ($user->is_admin) {
            return back()->with('error', 'User is already an admin.');
        }

        $user->update(['is_admin' => true]);

        return back()->with('success', "{$user->name} has been promoted to admin.");
    }

    /**
     * Demote an admin to regular user.
     */
    public function demote(User $user): RedirectResponse
    {
        // Prevent self-demotion
        if ($user->id === request()->user()->id) {
            return back()->with('error', 'You cannot demote yourself.');
        }

        if (!$user->is_admin) {
            return back()->with('error', 'User is not an admin.');
        }

        $user->update(['is_admin' => false]);

        return back()->with('success', "{$user->name} has been demoted to regular user.");
    }
}

