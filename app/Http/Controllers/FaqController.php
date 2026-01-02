<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\FaqCategory;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Display the public FAQ page with all categories and their FAQs.
     */
    public function index(): Response
    {
        $categories = FaqCategory::with([
            'faqs' => function ($query) {
                $query->orderBy('order');
            }
        ])
            ->orderBy('order')
            ->get();

        return Inertia::render('faq', [
            'categories' => $categories,
        ]);
    }
}
