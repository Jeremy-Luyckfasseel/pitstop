<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFaqCategoryRequest;
use App\Http\Requests\Admin\UpdateFaqCategoryRequest;
use App\Models\FaqCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqCategoryController extends Controller
{
    /**
     * Display a listing of FAQ categories.
     */
    public function index(): Response
    {
        return Inertia::render('admin/faq-categories/index', [
            'categories' => FaqCategory::withCount('faqs')
                ->orderBy('order')
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new category.
     */
    public function create(): Response
    {
        return Inertia::render('admin/faq-categories/create');
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(StoreFaqCategoryRequest $request): RedirectResponse
    {
        FaqCategory::create($request->validated());

        return to_route('admin.faq-categories.index')
            ->with('success', 'FAQ category created successfully.');
    }

    /**
     * Show the form for editing the specified category.
     */
    public function edit(FaqCategory $faqCategory): Response
    {
        return Inertia::render('admin/faq-categories/edit', [
            'category' => $faqCategory,
        ]);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(UpdateFaqCategoryRequest $request, FaqCategory $faqCategory): RedirectResponse
    {
        $faqCategory->update($request->validated());

        return to_route('admin.faq-categories.index')
            ->with('success', 'FAQ category updated successfully.');
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(FaqCategory $faqCategory): RedirectResponse
    {
        $faqCategory->delete();

        return to_route('admin.faq-categories.index')
            ->with('success', 'FAQ category deleted successfully.');
    }
}
