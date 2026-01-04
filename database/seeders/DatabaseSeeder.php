<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\NewsItem;
use App\Models\FaqCategory;
use App\Models\Faq;
use App\Models\Thread;
use App\Models\Reply;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'name' => 'Admin User',
            'username' => 'admin',
            'email' => 'admin@ehb.be',
            'password' => 'Password!321',
            'is_admin' => true,
            'email_verified_at' => now(),
            'bio' => 'I am the administrator of Pitstop F1 Forum.',
        ]);

        // Create Regular Users
        $users = User::factory(5)->create();

        // Create News Items
        NewsItem::create([
            'title' => 'Welcome to Pitstop!',
            'content' => 'Pitstop is your new home for F1 discussions. Join the community and share your passion for Formula 1!',
            'published_at' => now(),
            'user_id' => $admin->id,
        ]);

        NewsItem::create([
            'title' => '2026 Season Preview',
            'content' => 'Get ready for an exciting 2026 F1 season. Who will challenge for the championship?',
            'published_at' => now()->subDays(2),
            'user_id' => $admin->id,
        ]);

        // Create FAQ Categories
        $generalCategory = FaqCategory::create([
            'name' => 'General Questions',
            'order' => 1,
        ]);

        $forumCategory = FaqCategory::create([
            'name' => 'Forum Usage',
            'order' => 2,
        ]);

        // Create FAQs
        Faq::create([
            'faq_category_id' => $generalCategory->id,
            'question' => 'What is Pitstop?',
            'answer' => 'Pitstop is a community forum dedicated to Formula 1 fans where you can discuss races, drivers, teams, and everything F1!',
            'order' => 1,
        ]);

        Faq::create([
            'faq_category_id' => $generalCategory->id,
            'question' => 'How do I create an account?',
            'answer' => 'Click on the Register button in the navigation bar and fill in the required information.',
            'order' => 2,
        ]);

        Faq::create([
            'faq_category_id' => $forumCategory->id,
            'question' => 'How do I start a discussion?',
            'answer' => 'Navigate to the Forum section and click "New Thread". Give your thread a title and write your message.',
            'order' => 1,
        ]);

        // Create Forum Threads
        $thread1 = Thread::create([
            'user_id' => $users->random()->id,
            'title' => 'Who will win the 2026 Championship?',
            'body' => 'I think Max will dominate again, but Mercedes looks strong this year. What are your predictions?',
            'is_pinned' => true,
        ]);

        $thread2 = Thread::create([
            'user_id' => $users->random()->id,
            'title' => 'Best F1 race of all time?',
            'body' => 'For me, it has to be Canada 2011. The drama, the rain, the comeback - everything was perfect!',
        ]);

        // Create Replies
        Reply::create([
            'thread_id' => $thread1->id,
            'user_id' => $users->random()->id,
            'body' => 'I agree! Red Bull has the best car, but never count out Mercedes.',
        ]);

        Reply::create([
            'thread_id' => $thread1->id,
            'user_id' => $admin->id,
            'body' => 'Great discussion! Remember to keep it respectful, everyone.',
        ]);

        Reply::create([
            'thread_id' => $thread2->id,
            'user_id' => $users->random()->id,
            'body' => 'Brazil 2008 for me. That last-corner overtake was insane!',
        ]);
    }
}