<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFaqRequest;
use App\Http\Requests\Admin\UpdateFaqRequest;
use App\Models\Faq;
use App\Models\FaqCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display a listing of FAQs.
     */
    public function index(): Response
    {
        return Inertia::render('admin/faqs/index', [
            'faqs' => Faq::with('category')
                ->orderBy('faq_category_id')
                ->orderBy('order')
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new FAQ.
     */
    public function create(): Response
    {
        return Inertia::render('admin/faqs/create', [
            'categories' => $this->getOrderedCategories(),
        ]);
    }

    /**
     * Store a newly created FAQ in storage.
     */
    public function store(StoreFaqRequest $request): RedirectResponse
    {
        Faq::create($request->validated());

        return to_route('admin.faqs.index')
            ->with('success', 'FAQ created successfully.');
    }

    /**
     * Show the form for editing the specified FAQ.
     */
    public function edit(Faq $faq): Response
    {
        return Inertia::render('admin/faqs/edit', [
            'faq' => $faq->load('category'),
            'categories' => $this->getOrderedCategories(),
        ]);
    }

    /**
     * Update the specified FAQ in storage.
     */
    public function update(UpdateFaqRequest $request, Faq $faq): RedirectResponse
    {
        $faq->update($request->validated());

        return to_route('admin.faqs.index')
            ->with('success', 'FAQ updated successfully.');
    }

    /**
     * Remove the specified FAQ from storage.
     */
    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return to_route('admin.faqs.index')
            ->with('success', 'FAQ deleted successfully.');
    }

    /**
     * Get categories ordered for dropdown.
     */
    private function getOrderedCategories()
    {
        return FaqCategory::orderBy('order')->get();
    }
}
