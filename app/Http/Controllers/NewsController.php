<?php

namespace App\Http\Controllers;

use App\Models\NewsItem;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of published news items for public.
     */
    public function index(): Response
    {
        $newsItems = NewsItem::with('author')
            ->published()
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('news/index', [
            'newsItems' => $newsItems,
        ]);
    }

    /**
     * Display the specified news item.
     */
    public function show(NewsItem $newsItem): Response
    {
        // Load the author relationship
        $newsItem->load('author');

        return Inertia::render('news/show', [
            'newsItem' => $newsItem,
        ]);
    }

    /**
     * Show the form for creating a new news item.
     */
    public function create(): Response
    {
        return Inertia::render('admin/news/create');
    }

    /**
     * Store a newly created news item in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['required', 'image', 'mimes:jpeg,jpg,png,gif,webp', 'max:5120'], // 5MB max
            'published_at' => ['required', 'date'],
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            $validated['image_path'] = $path;
        }

        // Add the authenticated user as author
        $validated['user_id'] = $request->user()->id;

        // Remove the 'image' key as we're using 'image_path'
        unset($validated['image']);

        NewsItem::create($validated);

        return to_route('admin.news.index')->with('success', 'News item created successfully.');
    }

    /**
     * Show the form for editing the specified news item.
     */
    public function edit(NewsItem $newsItem): Response
    {
        $this->authorize('update', $newsItem);

        return Inertia::render('admin/news/edit', [
            'newsItem' => $newsItem,
        ]);
    }

    /**
     * Update the specified news item in storage.
     */
    public function update(Request $request, NewsItem $newsItem): RedirectResponse
    {
        $this->authorize('update', $newsItem);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,jpg,png,gif,webp', 'max:5120'],
            'published_at' => ['required', 'date'],
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($newsItem->image_path && Storage::disk('public')->exists($newsItem->image_path)) {
                Storage::disk('public')->delete($newsItem->image_path);
            }

            // Store new image
            $path = $request->file('image')->store('news', 'public');
            $validated['image_path'] = $path;
        }

        // Remove the 'image' key as we're using 'image_path'
        unset($validated['image']);

        $newsItem->update($validated);

        return to_route('admin.news.index')->with('success', 'News item updated successfully.');
    }

    /**
     * Remove the specified news item from storage.
     */
    public function destroy(NewsItem $newsItem): RedirectResponse
    {
        $this->authorize('delete', $newsItem);

        // Delete associated image
        if ($newsItem->image_path && Storage::disk('public')->exists($newsItem->image_path)) {
            Storage::disk('public')->delete($newsItem->image_path);
        }

        $newsItem->delete();

        return to_route('admin.news.index')->with('success', 'News item deleted successfully.');
    }

    /**
     * Display a listing of all news items for admin.
     */
    public function adminIndex(): Response
    {
        $newsItems = NewsItem::with('author')
            ->latest('created_at')
            ->paginate(15);

        return Inertia::render('admin/news/index', [
            'newsItems' => $newsItems,
        ]);
    }
}
