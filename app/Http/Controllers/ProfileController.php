<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the public profile of a user.
     */
    public function show(User $user): Response
    {
        // Get recent threads (last 5)
        $recentThreads = $user->threads()
            ->with('replies')
            ->withCount('replies')
            ->latest()
            ->take(5)
            ->get();

        // Get recent replies (last 5) with their thread
        $recentReplies = $user->replies()
            ->with('thread')
            ->latest()
            ->take(5)
            ->get();

        // Get recent news items if user is admin (last 3)
        $recentNews = $user->is_admin
            ? $user->newsItems()->latest()->take(3)->get()
            : collect();

        // Get favorite threads (last 5)
        $favoriteThreads = $user->favoriteThreads()
            ->with('author')
            ->withCount('replies')
            ->latest('thread_user_favorites.created_at')
            ->take(5)
            ->get();

        return Inertia::render('profile/show', [
            'profileUser' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'bio' => $user->bio,
                'birthday' => $user->birthday,
                'avatar' => $user->avatar,
                'is_admin' => $user->is_admin,
                'created_at' => $user->created_at,
            ],
            'recentThreads' => $recentThreads,
            'recentReplies' => $recentReplies,
            'recentNews' => $recentNews,
            'favoriteThreads' => $favoriteThreads,
            'isOwner' => request()->user()?->id === $user->id,
        ]);
    }
}
