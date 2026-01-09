<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\NewsItem;
use App\Models\FaqCategory;
use App\Models\Faq;
use App\Models\Thread;
use App\Models\Reply;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Set current date context: January 9, 2026
        $now = Carbon::create(2026, 1, 9, 12, 0, 0);

        // =============================================
        // USERS
        // =============================================

        // Required Admin Account
        $admin = User::create([
            'name' => 'Admin User',
            'username' => 'admin',
            'email' => 'admin@ehb.be',
            'password' => 'Password!321',
            'is_admin' => true,
            'email_verified_at' => $now->copy()->subMonths(6),
            'bio' => 'Welcome to Pitstop! I\'m the administrator of this F1 community. Feel free to reach out if you have any questions!',
            'birthday' => '1990-03-14',
            'created_at' => $now->copy()->subMonths(6),
        ]);

        // Create realistic F1 fan users
        $lewis = User::create([
            'name' => 'Lewis Hamilton',
            'username' => 'lewishamilton44',
            'email' => 'lewis@example.com',
            'password' => 'password123',
            'is_admin' => false,
            'email_verified_at' => $now->copy()->subMonths(3),
            'bio' => 'Still I Rise 🏆 Year 2 at Ferrari! 2025 was tough but we learned a lot. 2026 is THE year! 🔴',
            'birthday' => '1995-07-12',
            'created_at' => $now->copy()->subMonths(3),
        ]);

        $max = User::create([
            'name' => 'Max Verstappen Fan',
            'username' => 'simplylovely33',
            'email' => 'max.fan@example.com',
            'password' => 'password123',
            'is_admin' => false,
            'email_verified_at' => $now->copy()->subMonths(2),
            'bio' => 'Simply lovely! 🦁 Orange Army member. Four-time world champion supporter! 2021-2024 never forget.',
            'birthday' => '1998-02-28',
            'created_at' => $now->copy()->subMonths(2),
        ]);

        $charles = User::create([
            'name' => 'Charles Leclerc',
            'username' => 'ferrari16',
            'email' => 'charles@example.com',
            'password' => 'password123',
            'is_admin' => false,
            'email_verified_at' => $now->copy()->subMonths(4),
            'bio' => 'Forza Ferrari! 🔴 Tifosi since birth. Monaco born and raised. 2025 was just the beginning!',
            'birthday' => '1997-10-16',
            'created_at' => $now->copy()->subMonths(4),
        ]);

        $lando = User::create([
            'name' => 'Lando Norris',
            'username' => 'landonorris4',
            'email' => 'lando@example.com',
            'password' => 'password123',
            'is_admin' => false,
            'email_verified_at' => $now->copy()->subMonths(1),
            'bio' => '2025 WORLD CHAMPION! 🏆🧡 Papaya Army! McLaren fan through thick and thin. Dreams do come true!',
            'birthday' => '2001-05-20',
            'created_at' => $now->copy()->subMonths(1),
        ]);

        $sarah = User::create([
            'name' => 'Sarah Williams',
            'username' => 'sarahf1',
            'email' => 'sarah@example.com',
            'password' => 'password123',
            'is_admin' => false,
            'email_verified_at' => $now->copy()->subWeeks(3),
            'bio' => 'F1 journalist and data analyst. Love diving into race strategies and telemetry data.',
            'birthday' => '1992-08-05',
            'created_at' => $now->copy()->subWeeks(3),
        ]);

        $tifosi = User::create([
            'name' => 'Marco Rossi',
            'username' => 'tifosi_marco',
            'email' => 'marco@example.com',
            'password' => 'password123',
            'is_admin' => false,
            'email_verified_at' => $now->copy()->subWeeks(2),
            'bio' => 'Italian F1 fan living in Maranello. Hamilton + Leclerc = dream team! 2026 is THE year! 🇮🇹',
            'birthday' => '1988-12-25',
            'created_at' => $now->copy()->subWeeks(2),
        ]);

        $newbie = User::create([
            'name' => 'Emma Johnson',
            'username' => 'f1newbie2026',
            'email' => 'emma@example.com',
            'password' => 'password123',
            'is_admin' => false,
            'email_verified_at' => $now->copy()->subDays(3),
            'bio' => 'Just got into F1 during the 2025 season. Norris winning the championship was amazing! So excited for 2026!',
            'birthday' => '2000-03-15',
            'created_at' => $now->copy()->subDays(3),
        ]);

        $allUsers = collect([$admin, $lewis, $max, $charles, $lando, $sarah, $tifosi, $newbie]);

        // =============================================
        // NEWS ITEMS
        // =============================================

        // Breaking news - today
        NewsItem::create([
            'title' => '2026 Car Launches: Full Schedule Revealed!',
            'content' => "The wait is almost over! All ten Formula 1 teams have now confirmed their 2026 car launch dates, and fans are in for an exciting few weeks.\n\n**Confirmed Launch Dates:**\n\n- **Ferrari**: January 16, 2026 - Maranello, Italy\n- **Red Bull Racing**: January 17, 2026 - Milton Keynes, UK\n- **McLaren**: January 18, 2026 - Woking Technology Centre (Defending Champions!)\n- **Mercedes**: January 20, 2026 - Silverstone, UK\n- **Aston Martin**: January 21, 2026 - Silverstone\n- **Alpine**: January 22, 2026 - Paris, France\n- **Williams**: January 23, 2026 - Grove, UK\n- **Haas**: January 24, 2026 - Online\n- **RB (VCARB)**: January 25, 2026 - Faenza, Italy\n- **Sauber/Audi**: January 27, 2026 - Hinwil, Switzerland\n\nWith the new 2026 regulations bringing major changes to power units and aerodynamics, these launches are expected to reveal some dramatically different looking cars.\n\nStay tuned to Pitstop for live coverage of each launch!",
            'published_at' => $now->copy()->subHours(3),
            'user_id' => $admin->id,
            'created_at' => $now->copy()->subHours(3),
        ]);

        // Yesterday's news
        NewsItem::create([
            'title' => 'Norris Reflects on Championship Win: "Best Year of My Life"',
            'content' => "2025 World Champion Lando Norris has been reflecting on his incredible title-winning season with McLaren.\n\n\"It still doesn't feel real,\" Norris said in an exclusive interview. \"Every morning I wake up and remember - I'm a World Champion. It's the best feeling in the world.\"\n\nNorris won 8 races in 2025, fighting off fierce competition from Ferrari's Charles Leclerc and Red Bull's Max Verstappen. The title was clinched at the penultimate race in Qatar.\n\n\"The whole team deserves this. McLaren gave me an incredible car, and Oscar [Piastri] was the perfect teammate. We delivered the Constructors' Championship too, which made it even more special.\"\n\nLooking ahead to 2026, Norris is determined to defend his crown: \"The new regulations will shake everything up, but McLaren has been preparing for years. We're ready to fight for back-to-back titles.\"",
            'published_at' => $now->copy()->subDay(),
            'user_id' => $admin->id,
            'created_at' => $now->copy()->subDay(),
        ]);

        // Recent news
        NewsItem::create([
            'title' => '2026 F1 Calendar: Record 24 Races Confirmed',
            'content' => "The FIA has officially confirmed the 2026 Formula 1 calendar, featuring a record 24 races across five continents.\n\n**Key Highlights:**\n\n- Season opener in Bahrain on March 15\n- Return of the Japanese Grand Prix to its traditional early-season slot\n- New street race in Bangkok, Thailand (October 11)\n- Las Vegas Grand Prix remains on the calendar for night racing\n- Season finale in Abu Dhabi on December 6\n\n**European triple-header:** Spain, Monaco, and Canada in consecutive weeks promises intense action.\n\n**Sprint weekends:** Six sprint races will be held at Austria, Belgium, Qatar, USA, Brazil, and the new Bangkok GP.\n\nThe calendar represents the longest season in F1 history, with teams expressing concerns about the demanding schedule for staff.",
            'published_at' => $now->copy()->subDays(2),
            'user_id' => $admin->id,
            'created_at' => $now->copy()->subDays(2),
        ]);

        NewsItem::create([
            'title' => 'Hamilton Looking Forward to Year Two at Ferrari',
            'content' => "Lewis Hamilton says he's \"hungrier than ever\" heading into his second season with Ferrari.\n\nHis debut year with the Scuderia in 2025 was challenging - no race wins and only a Sprint victory in China - but Hamilton remains optimistic about 2026.\n\n\"The first season was about learning - the team, the car, the culture,\" Hamilton explained. \"It wasn't easy. We had pace but couldn't convert it into wins. That's been frustrating, but I've learned so much.\"\n\n\"Now I feel fully integrated. Charles and I have a great relationship, and the new regulations give us a clean slate. I have a really good feeling about this car.\"\n\nFerrari struggled to match McLaren's pace in 2025, but the team has invested heavily in the 2026 power unit development.\n\nAt 41, Hamilton would become the oldest World Champion in F1 history if he wins the 2026 title - a goal that drives him every day.",
            'published_at' => $now->copy()->subDays(3),
            'user_id' => $admin->id,
            'created_at' => $now->copy()->subDays(3),
        ]);

        NewsItem::create([
            'title' => 'Verstappen Signs New Red Bull Contract Through 2030',
            'content' => "Four-time World Champion Max Verstappen has signed a contract extension with Red Bull Racing, keeping him at the team until the end of the 2030 season.\n\nAfter narrowly missing out on the 2025 title to Lando Norris, Verstappen is determined to bounce back.\n\n\"Last year was tough - McLaren did an incredible job,\" Verstappen admitted. \"But I'm not going anywhere. Red Bull is my home, and we're going to come back stronger.\"\n\nThe deal is reported to be worth over €50 million per year, making Verstappen one of the highest-paid athletes in the world.\n\nTeam Principal Christian Horner added: \"Max is one of the greatest drivers in F1 history. The 2026 regulations give us a fresh opportunity, and we're confident we can return to the top.\"",
            'published_at' => $now->copy()->subDays(5),
            'user_id' => $admin->id,
            'created_at' => $now->copy()->subDays(5),
        ]);

        NewsItem::create([
            'title' => 'New 2026 Power Unit Regulations Explained',
            'content' => "With the 2026 season bringing the biggest change to F1 power units in a decade, here's everything you need to know:\n\n**Key Changes:**\n\n1. **50/50 Power Split**: Electrical and internal combustion power will be equal for the first time\n2. **400kW Electrical Power**: Up from 120kW in current units\n3. **100% Sustainable Fuels**: Mandatory use of fully sustainable fuels\n4. **Simplified MGU**: Removal of the MGU-H, keeping only MGU-K\n5. **Increased Battery Capacity**: 350kJ storage, triple the current spec\n\n**Impact on Racing:**\n\nExpect more wheel-to-wheel racing with simplified aero and increased energy deployment strategy. Teams will need to manage battery charge states carefully, potentially creating dramatic late-race scenarios.\n\n**New Manufacturers:**\n\nAudi enters as an engine supplier (initially for Sauber), while Ford returns as a Red Bull partner.",
            'published_at' => $now->copy()->subWeek(),
            'user_id' => $admin->id,
            'created_at' => $now->copy()->subWeek(),
        ]);

        // =============================================
        // FAQ CATEGORIES & QUESTIONS
        // =============================================

        $generalCategory = FaqCategory::create([
            'name' => 'Getting Started',
            'order' => 1,
        ]);

        $accountCategory = FaqCategory::create([
            'name' => 'Account & Profile',
            'order' => 2,
        ]);

        $forumCategory = FaqCategory::create([
            'name' => 'Forum & Community',
            'order' => 3,
        ]);

        $f1Category = FaqCategory::create([
            'name' => 'F1 Knowledge',
            'order' => 4,
        ]);

        // Getting Started FAQs
        Faq::create([
            'faq_category_id' => $generalCategory->id,
            'question' => 'What is Pitstop?',
            'answer' => 'Pitstop is the ultimate community platform for Formula 1 fans! Here you can discuss races, share your predictions, debate driver performances, and connect with fellow F1 enthusiasts from around the world. Whether you\'re a die-hard tifosi or new to the sport, you\'re welcome here!',
            'order' => 1,
        ]);

        Faq::create([
            'faq_category_id' => $generalCategory->id,
            'question' => 'Is Pitstop free to use?',
            'answer' => 'Yes! Pitstop is completely free to use. Simply create an account to join discussions, post in the forum, and become part of our amazing F1 community.',
            'order' => 2,
        ]);

        Faq::create([
            'faq_category_id' => $generalCategory->id,
            'question' => 'Do I need an account to view content?',
            'answer' => 'No, you can browse news articles, FAQ pages, and forum discussions without an account. However, to participate in discussions, post replies, or save favorite threads, you\'ll need to register for a free account.',
            'order' => 3,
        ]);

        // Account FAQs
        Faq::create([
            'faq_category_id' => $accountCategory->id,
            'question' => 'How do I create an account?',
            'answer' => 'Click the "Register" button in the top navigation bar. Fill in your name, email address, and choose a secure password. After registering, you\'ll receive a verification email to confirm your account.',
            'order' => 1,
        ]);

        Faq::create([
            'faq_category_id' => $accountCategory->id,
            'question' => 'How do I customize my profile?',
            'answer' => 'After logging in, go to Settings > Profile. You can customize your username, add a profile photo, set your birthday, and write an "About Me" bio. Your profile is visible to other community members.',
            'order' => 2,
        ]);

        Faq::create([
            'faq_category_id' => $accountCategory->id,
            'question' => 'What is Two-Factor Authentication (2FA)?',
            'answer' => 'Two-Factor Authentication adds an extra layer of security to your account. When enabled, you\'ll need both your password AND a code from your authenticator app to log in. You can enable 2FA in Settings > Security.',
            'order' => 3,
        ]);

        Faq::create([
            'faq_category_id' => $accountCategory->id,
            'question' => 'I forgot my password. What do I do?',
            'answer' => 'Click "Forgot your password?" on the login page. Enter your email address, and we\'ll send you a link to reset your password. The link expires after 60 minutes for security.',
            'order' => 4,
        ]);

        // Forum FAQs
        Faq::create([
            'faq_category_id' => $forumCategory->id,
            'question' => 'How do I start a new discussion?',
            'answer' => 'Navigate to the Forum section and click the "New Thread" button. Give your discussion a descriptive title and write your message. Other community members can then reply to your thread.',
            'order' => 1,
        ]);

        Faq::create([
            'faq_category_id' => $forumCategory->id,
            'question' => 'What are pinned threads?',
            'answer' => 'Pinned threads are important discussions that administrators want to highlight. They always appear at the top of the forum list. These might include community guidelines, important announcements, or popular discussions.',
            'order' => 2,
        ]);

        Faq::create([
            'faq_category_id' => $forumCategory->id,
            'question' => 'How do I save threads for later?',
            'answer' => 'You can bookmark any thread by clicking the star/bookmark icon. Saved threads appear in your favorites list for easy access later. Great for keeping track of discussions you want to follow!',
            'order' => 3,
        ]);

        Faq::create([
            'faq_category_id' => $forumCategory->id,
            'question' => 'What are the community guidelines?',
            'answer' => 'Be respectful to all members, even when disagreeing. No personal attacks, spam, or offensive content. Keep discussions on topic. Support fellow fans, regardless of which team or driver they support. Remember: we\'re all here because we love F1!',
            'order' => 4,
        ]);

        // F1 Knowledge FAQs
        Faq::create([
            'faq_category_id' => $f1Category->id,
            'question' => 'What are the 2026 regulation changes?',
            'answer' => 'The 2026 regulations bring major changes: 50/50 split between electrical and combustion power, removal of MGU-H, 100% sustainable fuels, simplified aerodynamics with active aero elements, and new wheel-to-wheel racing focus. It\'s the biggest change to F1 in decades!',
            'order' => 1,
        ]);

        Faq::create([
            'faq_category_id' => $f1Category->id,
            'question' => 'Who won the 2025 World Championship?',
            'answer' => 'Lando Norris (McLaren) won the 2025 Drivers\' Championship, becoming Britain\'s first World Champion since Lewis Hamilton in 2020. McLaren also won the Constructors\' Championship, their first since 1998!',
            'order' => 2,
        ]);

        Faq::create([
            'faq_category_id' => $f1Category->id,
            'question' => 'When does the 2026 season start?',
            'answer' => 'The 2026 Formula 1 season kicks off with pre-season testing in Bahrain on February 26-28. The first race is the Bahrain Grand Prix on March 15, 2026. Get ready for an exciting 24-race season!',
            'order' => 3,
        ]);

        // =============================================
        // FORUM THREADS
        // =============================================

        // Pinned announcement thread
        $welcomeThread = Thread::create([
            'user_id' => $admin->id,
            'title' => '🏎️ Welcome to Pitstop - Read This First!',
            'body' => "Welcome to Pitstop, the ultimate community for Formula 1 fans!\n\n**Community Guidelines:**\n\n1. Be respectful to all members\n2. No personal attacks or harassment\n3. Keep discussions on topic\n4. No spam or self-promotion\n5. Have fun and enjoy the racing!\n\nWhether you support McLaren (congrats on 2025!), Ferrari, Red Bull, or any other team - you're welcome here. Let's celebrate our shared love of F1!\n\nFeel free to introduce yourself in the replies below. 🏁",
            'is_pinned' => true,
            'created_at' => $now->copy()->subMonths(2),
        ]);

        // Hot topic - Championship predictions
        $champsThread = Thread::create([
            'user_id' => $max->id,
            'title' => 'Can Norris defend his title in 2026?',
            'body' => "Lando won the 2025 championship in style, but can McLaren adapt to the new regulations?\n\nEveryone's talking about Ferrari and the Hamilton/Leclerc dream team, but I wouldn't count out Red Bull either. Max WILL be back.\n\nMy 2026 predictions:\n1. Hamilton (Ferrari redemption arc completing!)\n2. Verstappen (Back with a vengeance)\n3. Norris (Defends well but new regs hurt McLaren)\n4. Leclerc (Internal Ferrari battle)\n\nWhat do you think? 🏆",
            'is_pinned' => true,
            'created_at' => $now->copy()->subDays(5),
        ]);

        // Car launches discussion
        $launchThread = Thread::create([
            'user_id' => $charles->id,
            'title' => 'Ferrari 2026 Car Launch - January 16th!',
            'body' => "Only one week until we see the new Ferrari! 🔴\n\nAfter a strong 2025 with Lewis joining us, you know the team has been working overtime on this car. The launch is at Maranello and the hype is REAL.\n\nWith the new regulations, this could finally be THE year! Hamilton bringing his experience + our development = 🏆\n\nForza Ferrari! 🇮🇹",
            'is_pinned' => false,
            'created_at' => $now->copy()->subDays(2),
        ]);

        // McLaren celebration
        $mclarenThread = Thread::create([
            'user_id' => $lando->id,
            'title' => 'MCLAREN 2025 CHAMPIONS - Still can\'t believe it!',
            'body' => "We did it. We actually did it! 🧡🏆\n\nFirst Drivers' Championship since Mika in 1999. First Constructors' since 1998. This team has worked SO hard.\n\nSpecial thanks to:\n- Andrea Stella for the incredible leadership\n- Every single person at MTC\n- Oscar for being the best teammate ever\n- The Papaya Army for never giving up on us!\n\n2026 we go again. Let's make it back-to-back! 🧡",
            'is_pinned' => false,
            'created_at' => $now->copy()->subDays(6),
        ]);

        // Technical discussion
        $puThread = Thread::create([
            'user_id' => $sarah->id,
            'title' => 'Analyzing the 2026 Power Unit regulations - why they matter',
            'body' => "Let's talk about the biggest technical change in years - the 2026 power units.\n\n**Key technical points:**\n\n- 350kW electrical vs 350kW ICE (50/50 split)\n- No more MGU-H (simpler, cheaper, but less efficient)\n- Triple the battery storage capacity\n- Mandatory sustainable fuels\n\n**What this means for racing:**\n\nEnergy management becomes even more critical. We could see drivers having to lift and coast more OR deploy massive power boosts at key moments. The lack of MGU-H means more turbo lag and potentially different driving characteristics.\n\nThe simplified aero with active elements should help with dirty air, but I'm curious how teams will exploit the new rules.\n\nThoughts from the technically-minded fans here?",
            'is_pinned' => false,
            'created_at' => $now->copy()->subDays(3),
        ]);

        // Fun discussion
        $bestRaceThread = Thread::create([
            'user_id' => $lewis->id,
            'title' => 'Best F1 race of 2025? My favorites!',
            'body' => "What a season 2025 was! So many incredible races. Here are my top 5:\n\n1. **Interlagos** - Lando clinching the championship in style, incredible atmosphere\n2. **Silverstone** - Amazing battle between Charles and Max in changeable conditions\n3. **Suzuka** - Max's incredible fightback from P10 to the podium\n4. **Singapore** - Oscar's masterclass, dominated the whole weekend\n5. **China Sprint** - My only victory of the year, but it felt amazing! 🔴\n\nWhat were your favorite races of 2025? 🏁",
            'is_pinned' => false,
            'created_at' => $now->copy()->subWeek(),
        ]);

        // New user thread
        $newbieThread = Thread::create([
            'user_id' => $newbie->id,
            'title' => 'New F1 fan here - started watching in 2025!',
            'body' => "Hi everyone! I got into F1 during the 2025 season and WOW what a year to start!\n\nWatching Lando win the championship was amazing - I've become a huge McLaren fan! 🧡\n\nI'm trying to learn more about the technical side and the history. What should I know going into 2026 with all the new regulations?\n\nAlso, any good resources for learning about F1 history?\n\nThanks for any help! This community seems awesome! 😊",
            'is_pinned' => false,
            'created_at' => $now->copy()->subDays(2),
        ]);

        // =============================================
        // REPLIES
        // =============================================

        // Welcome thread replies
        Reply::create([
            'thread_id' => $welcomeThread->id,
            'user_id' => $lewis->id,
            'body' => 'Excited to be here! Looking forward to discussing what\'s coming in 2026. Year 2 at Ferrari - let\'s make it count! 🔴',
            'created_at' => $now->copy()->subMonths(2)->addHours(2),
        ]);

        Reply::create([
            'thread_id' => $welcomeThread->id,
            'user_id' => $lando->id,
            'body' => 'Champion checking in! 🏆 Ready to defend the title. Great community here!',
            'created_at' => $now->copy()->subMonths(2)->addDays(1),
        ]);

        Reply::create([
            'thread_id' => $welcomeThread->id,
            'user_id' => $newbie->id,
            'body' => 'Just joined! What an amazing sport. Can\'t wait to experience my first full season from the start!',
            'created_at' => $now->copy()->subDays(2),
        ]);

        // Championship predictions replies
        Reply::create([
            'thread_id' => $champsThread->id,
            'user_id' => $charles->id,
            'body' => "Internal Ferrari battle? Lewis and I are teammates, not rivals. We're both focused on beating everyone else! Forza Ferrari 🔴",
            'created_at' => $now->copy()->subDays(4)->addHours(3),
        ]);

        Reply::create([
            'thread_id' => $champsThread->id,
            'user_id' => $lando->id,
            'body' => "New regs hurt McLaren? We've been preparing for 2026 for years. The MCL40 is going to be special. Back-to-back incoming! 🧡",
            'created_at' => $now->copy()->subDays(4)->addHours(5),
        ]);

        Reply::create([
            'thread_id' => $champsThread->id,
            'user_id' => $lewis->id,
            'body' => "I've won championships under new regs before. Ferrari has given me everything I need. 2026 feels special. Let's see 🏆",
            'created_at' => $now->copy()->subDays(3)->addHours(8),
        ]);

        Reply::create([
            'thread_id' => $champsThread->id,
            'user_id' => $sarah->id,
            'body' => "Looking at the pre-season development, all top teams seem strong. Ferrari's investment in their PU department is massive. Red Bull has Ford backing now. McLaren has momentum. This will be the closest season in years!",
            'created_at' => $now->copy()->subDays(3)->addHours(10),
        ]);

        Reply::create([
            'thread_id' => $champsThread->id,
            'user_id' => $tifosi->id,
            'body' => "After watching Hamilton perform miracles in his first Ferrari season, I'm ALL IN on 2026. The tifosi believe! 🇮🇹",
            'created_at' => $now->copy()->subDays(2),
        ]);

        // Ferrari launch thread replies
        Reply::create([
            'thread_id' => $launchThread->id,
            'user_id' => $tifosi->id,
            'body' => "Living in Maranello, the atmosphere is ELECTRIC. After the improvements in 2025, everyone believes 2026 is THE year! 🔴🔴🔴",
            'created_at' => $now->copy()->subDays(2)->addHours(4),
        ]);

        Reply::create([
            'thread_id' => $launchThread->id,
            'user_id' => $lewis->id,
            'body' => "Been in the simulator every day. This car is going to be something special. Can't wait for everyone to see it! 🔴",
            'created_at' => $now->copy()->subDays(1)->addHours(6),
        ]);

        Reply::create([
            'thread_id' => $launchThread->id,
            'user_id' => $max->id,
            'body' => "Ferrari always has beautiful launches. Looking forward to seeing what you've got. Red Bull launch is the day after - game on! 💪",
            'created_at' => $now->copy()->subDays(1)->addHours(9),
        ]);

        // McLaren celebration replies
        Reply::create([
            'thread_id' => $mclarenThread->id,
            'user_id' => $admin->id,
            'body' => "Congratulations to the entire McLaren team! Well deserved after years of rebuilding. The Papaya Army kept the faith! 🧡",
            'created_at' => $now->copy()->subDays(5)->addHours(3),
        ]);

        Reply::create([
            'thread_id' => $mclarenThread->id,
            'user_id' => $newbie->id,
            'body' => "This is why I became a McLaren fan! Watching that final race in Brazil was incredible. Champion! 🏆",
            'created_at' => $now->copy()->subDays(5)->addHours(6),
        ]);

        Reply::create([
            'thread_id' => $mclarenThread->id,
            'user_id' => $lewis->id,
            'body' => "Congrats Lando! You've earned this. McLaren have been incredible. Now it's Ferrari's turn to answer back 😉🔴",
            'created_at' => $now->copy()->subDays(4)->addHours(10),
        ]);

        // Technical thread replies
        Reply::create([
            'thread_id' => $puThread->id,
            'user_id' => $admin->id,
            'body' => "Excellent technical breakdown! The MGU-H removal is particularly interesting. It was the most complex and expensive component. Without it, we might see more manufacturers interested in entering F1.",
            'created_at' => $now->copy()->subDays(2)->addHours(5),
        ]);

        Reply::create([
            'thread_id' => $puThread->id,
            'user_id' => $lando->id,
            'body' => "From a driver's perspective, the increased electrical power is going to feel incredible. We're talking about massive power delivery out of slow corners. It's going to change how we attack circuits!",
            'created_at' => $now->copy()->subDays(2)->addHours(8),
        ]);

        // Best race thread replies
        Reply::create([
            'thread_id' => $bestRaceThread->id,
            'user_id' => $max->id,
            'body' => "Suzuka was special for me. Starting P10 after that qualifying issue, but fighting back to the podium. The car was incredible that day!",
            'created_at' => $now->copy()->subWeek()->addHours(3),
        ]);

        Reply::create([
            'thread_id' => $bestRaceThread->id,
            'user_id' => $tifosi->id,
            'body' => "Monaco for me! A Ferrari winning at Monaco with Hamilton driving... I cried actual tears. Historic moment! 🇮🇹",
            'created_at' => $now->copy()->subWeek()->addDays(1),
        ]);

        Reply::create([
            'thread_id' => $bestRaceThread->id,
            'user_id' => $lando->id,
            'body' => "Brazil - clinching the championship at Interlagos. The crowd, the emotion, seeing papaya everywhere... best day of my life! 🧡🏆",
            'created_at' => $now->copy()->subDays(5),
        ]);

        // Newbie thread replies - helpful community
        Reply::create([
            'thread_id' => $newbieThread->id,
            'user_id' => $admin->id,
            'body' => "Welcome Emma! 🙌 Great choice with McLaren - Lando is a great champion to support. For 2026, the key things to know: new power units (more electric), new aero rules (simpler wings), and active aero is coming!",
            'created_at' => $now->copy()->subDays(2)->addHours(3),
        ]);

        Reply::create([
            'thread_id' => $newbieThread->id,
            'user_id' => $sarah->id,
            'body' => "Great to have you! For learning about F1:\n\n1. Chain Bear (YouTube) - best technical explainers\n2. F1 Official Tech Talk videos\n3. The Race technical breakdowns\n4. 'How to Build a Car' by Adrian Newey (book)\n\nAnd just ask questions here - we love helping new fans!",
            'created_at' => $now->copy()->subDays(1)->addHours(8),
        ]);

        Reply::create([
            'thread_id' => $newbieThread->id,
            'user_id' => $lando->id,
            'body' => "Welcome to the Papaya Army! 🧡 Perfect timing to join - we're the reigning champions! Let me know if you have any questions. And ignore anyone who gatekeeps - there's no wrong way to enjoy F1!",
            'created_at' => $now->copy()->subDays(1)->addHours(12),
        ]);

        Reply::create([
            'thread_id' => $newbieThread->id,
            'user_id' => $newbie->id,
            'body' => "Wow, you're all so helpful! Thank you! Already feel like part of the community. Can't wait for the 2026 season to start! 🧡",
            'created_at' => $now->copy()->subHours(6),
        ]);

        // =============================================
        // THREAD FAVORITES (Many-to-Many relationship demo)
        // =============================================

        // Add some favorites to demonstrate the M2M relationship
        $champsThread->favoritedBy()->attach([$lewis->id, $charles->id, $tifosi->id, $newbie->id, $sarah->id]);
        $launchThread->favoritedBy()->attach([$tifosi->id, $lewis->id, $charles->id, $admin->id]);
        $mclarenThread->favoritedBy()->attach([$lando->id, $newbie->id, $sarah->id, $admin->id]);
        $puThread->favoritedBy()->attach([$sarah->id, $admin->id, $lando->id]);
        $bestRaceThread->favoritedBy()->attach([$max->id, $tifosi->id, $lewis->id, $newbie->id]);
        $newbieThread->favoritedBy()->attach([$admin->id, $sarah->id, $lando->id]);
    }
}