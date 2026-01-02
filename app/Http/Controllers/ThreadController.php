<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreThreadRequest;
use App\Http\Requests\UpdateThreadRequest;
use App\Models\Thread;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ThreadController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of threads.
     */
    public function index(Request $request): Response
    {
        $sort = $request->get('sort', 'newest');

        $query = Thread::with(['author', 'replies'])
            ->withCount('replies');

        // Always show pinned threads first
        $query->orderByDesc('is_pinned');

        // Apply sorting
        match ($sort) {
            'replies' => $query->orderByDesc('replies_count'),
            default => $query->orderByDesc('created_at'),
        };

        return Inertia::render('forum/index', [
            'threads' => $query->paginate(15)->withQueryString(),
            'currentSort' => $sort,
        ]);
    }

    /**
     * Show the form for creating a new thread.
     */
    public function create(): Response
    {
        return Inertia::render('forum/create');
    }

    /**
     * Store a newly created thread in storage.
     */
    public function store(StoreThreadRequest $request): RedirectResponse
    {
        $thread = Thread::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return to_route('forum.show', $thread)
            ->with('success', 'Thread created successfully.');
    }

    /**
     * Display the specified thread with its replies.
     */
    public function show(Thread $thread): Response
    {
        $thread->load(['author', 'replies.author']);
        $user = request()->user();

        // Transform replies to include permission flags
        $repliesWithPermissions = $thread->replies->map(function ($reply) use ($user) {
            return [
                'id' => $reply->id,
                'body' => $reply->body,
                'created_at' => $reply->created_at,
                'author' => $reply->author,
                'canEdit' => $user && ($user->is_admin || $user->id === $reply->user_id),
                'canDelete' => $user && ($user->is_admin || $user->id === $reply->user_id),
            ];
        });

        // Check if current user has favorited this thread
        $isFavorited = $user ? $user->favoriteThreads()->where('thread_id', $thread->id)->exists() : false;

        return Inertia::render('forum/show', [
            'thread' => [
                'id' => $thread->id,
                'title' => $thread->title,
                'body' => $thread->body,
                'is_pinned' => $thread->is_pinned,
                'created_at' => $thread->created_at,
                'author' => $thread->author,
                'replies' => $repliesWithPermissions,
            ],
            'canEdit' => Gate::allows('update', $thread),
            'canDelete' => Gate::allows('delete', $thread),
            'canPin' => Gate::allows('pin', $thread),
            'isFavorited' => $isFavorited,
        ]);
    }

    /**
     * Show the form for editing the specified thread.
     */
    public function edit(Thread $thread): Response
    {
        $this->authorize('update', $thread);

        return Inertia::render('forum/edit', [
            'thread' => $thread,
        ]);
    }

    /**
     * Update the specified thread in storage.
     */
    public function update(UpdateThreadRequest $request, Thread $thread): RedirectResponse
    {
        $this->authorize('update', $thread);

        $thread->update($request->validated());

        return to_route('forum.show', $thread)
            ->with('success', 'Thread updated successfully.');
    }

    /**
     * Remove the specified thread from storage.
     */
    public function destroy(Thread $thread): RedirectResponse
    {
        $this->authorize('delete', $thread);

        $thread->delete();

        return to_route('forum.index')
            ->with('success', 'Thread deleted successfully.');
    }

    /**
     * Toggle the pinned status of the thread.
     */
    public function pin(Thread $thread): RedirectResponse
    {
        $this->authorize('pin', $thread);

        $thread->update([
            'is_pinned' => !$thread->is_pinned,
        ]);

        $status = $thread->is_pinned ? 'pinned' : 'unpinned';

        return back()->with('success', "Thread {$status} successfully.");
    }

    /**
     * Toggle favorite status for a thread.
     */
    public function toggleFavorite(Thread $thread): RedirectResponse
    {
        $user = request()->user();

        if ($user->favoriteThreads()->where('thread_id', $thread->id)->exists()) {
            $user->favoriteThreads()->detach($thread->id);
            $message = 'Thread removed from favorites.';
        } else {
            $user->favoriteThreads()->attach($thread->id);
            $message = 'Thread added to favorites.';
        }

        return back()->with('success', $message);
    }

}
