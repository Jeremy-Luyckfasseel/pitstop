<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\StoreNewsRequest;
use App\Http\Requests\Admin\UpdateNewsRequest;
use App\Models\NewsItem;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render('news/index', [
            'newsItems' => NewsItem::with('author')
                ->published()
                ->latest('published_at')
                ->paginate(12),
        ]);
    }

    /**
     * Display the specified news item.
     */
    public function show(NewsItem $newsItem): Response
    {
        return Inertia::render('news/show', [
            'newsItem' => $newsItem->load('author'),
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
    public function store(StoreNewsRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('image');
        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('news', 'public');
        }

        NewsItem::create($data);

        return to_route('admin.news.index')
            ->with('success', 'News item created successfully.');
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
    public function update(UpdateNewsRequest $request, NewsItem $newsItem): RedirectResponse
    {
        $this->authorize('update', $newsItem);

        $data = $request->safe()->except('image');

        if ($request->hasFile('image')) {
            $this->deleteOldImage($newsItem);
            $data['image_path'] = $request->file('image')->store('news', 'public');
        }

        $newsItem->update($data);

        return to_route('admin.news.index')
            ->with('success', 'News item updated successfully.');
    }

    /**
     * Remove the specified news item from storage.
     */
    public function destroy(NewsItem $newsItem): RedirectResponse
    {
        $this->authorize('delete', $newsItem);

        $this->deleteOldImage($newsItem);
        $newsItem->delete();

        return to_route('admin.news.index')
            ->with('success', 'News item deleted successfully.');
    }

    /**
     * Display a listing of all news items for admin.
     */
    public function adminIndex(): Response
    {
        return Inertia::render('admin/news/index', [
            'newsItems' => NewsItem::with('author')
                ->latest('created_at')
                ->paginate(15),
        ]);
    }

    /**
     * Delete the old image if it exists.
     */
    private function deleteOldImage(NewsItem $newsItem): void
    {
        if ($newsItem->image_path && Storage::disk('public')->exists($newsItem->image_path)) {
            Storage::disk('public')->delete($newsItem->image_path);
        }
    }
}
