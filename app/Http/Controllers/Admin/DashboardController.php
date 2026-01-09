<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\NewsItem;
use App\Models\Thread;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with statistics.
     */
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalNews' => NewsItem::count(),
                'totalFaqs' => Faq::count(),
                'totalThreads' => Thread::count(),
            ],
            'recentUsers' => User::latest()
                ->take(5)
                ->get(['id', 'name', 'username', 'email', 'is_admin', 'created_at']),
        ]);
    }
}
