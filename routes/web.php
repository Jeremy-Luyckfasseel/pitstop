<?php

use App\Http\Controllers\Admin\FaqCategoryController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ThreadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Public news routes
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{newsItem}', [NewsController::class, 'show'])->name('news.show');

// Public FAQ route
Route::get('/faq', [FaqController::class, 'index'])->name('faq.index');

// Contact routes
Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Forum routes - requires authentication
Route::middleware(['auth'])->group(function () {
    Route::resource('forum', ThreadController::class);
    Route::post('forum/{thread}/pin', [ThreadController::class, 'pin'])
        ->name('forum.pin')
        ->middleware('is_admin');
});

// Admin routes - requires authentication and admin privileges
Route::middleware(['auth', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    // News management routes
    Route::get('/news', [NewsController::class, 'adminIndex'])->name('news.index');
    Route::get('/news/create', [NewsController::class, 'create'])->name('news.create');
    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::get('/news/{newsItem}/edit', [NewsController::class, 'edit'])->name('news.edit');
    Route::put('/news/{newsItem}', [NewsController::class, 'update'])->name('news.update');
    Route::delete('/news/{newsItem}', [NewsController::class, 'destroy'])->name('news.destroy');

    // FAQ Category management routes
    Route::resource('faq-categories', FaqCategoryController::class);

    // FAQ management routes
    Route::resource('faqs', AdminFaqController::class);

    // User management routes will be added here
});

require __DIR__ . '/settings.php';

