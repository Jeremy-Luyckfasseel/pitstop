<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqCategoryController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReplyController;
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
    // Redirect old dashboard to forum
    Route::get('dashboard', function () {
        return redirect('/forum');
    })->name('dashboard');
});

// Public profile route (accessible by everyone, including guests)
Route::get('/profile/{user:username}', [ProfileController::class, 'show'])
    ->name('profile.show');

// Forum routes - requires authentication
Route::middleware(['auth'])->group(function () {
    // Thread routes - use 'thread' parameter name for model binding
    Route::resource('forum', ThreadController::class)->parameters([
        'forum' => 'thread',
    ]);
    Route::post('forum/{thread}/pin', [ThreadController::class, 'pin'])
        ->name('forum.pin')
        ->middleware('is_admin');
    Route::post('forum/{thread}/favorite', [ThreadController::class, 'toggleFavorite'])
        ->name('forum.favorite');


    // Reply routes
    Route::post('forum/{thread}/replies', [ReplyController::class, 'store'])
        ->name('replies.store');
    Route::put('replies/{reply}', [ReplyController::class, 'update'])
        ->name('replies.update');
    Route::delete('replies/{reply}', [ReplyController::class, 'destroy'])
        ->name('replies.destroy');
});

// Admin routes - requires authentication and admin privileges
Route::middleware(['auth', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin dashboard with statistics
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

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

    // User management routes
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::post('/users/{user}/promote', [UserController::class, 'promote'])->name('users.promote');
    Route::post('/users/{user}/demote', [UserController::class, 'demote'])->name('users.demote');
});

require __DIR__ . '/settings.php';


