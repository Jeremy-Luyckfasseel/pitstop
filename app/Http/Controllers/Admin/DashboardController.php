<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsItem;
use App\Models\Reply;
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
                'totalThreads' => Thread::count(),
                'totalReplies' => Reply::count(),
            ],
            'recentUsers' => User::latest()
                ->take(5)
                ->get(['id', 'name', 'username', 'email', 'is_admin', 'created_at']),
        ]);
    }
}
