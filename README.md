# Pitstop 🏎️ - F1 Forum & News Platform

A dynamic forum platform for Formula 1 fans, built with Laravel, Inertia.js, and React.

## ✨ Features Implemented

### Authentication & Users

- User registration with email verification
- Login with "Remember Me" functionality
- Password reset via email
- Two-Factor Authentication (2FA) support
- User roles (Admin / Regular User)
- Public profiles with avatars and bio
- Profile management with avatar upload

### Content Management

- **News System**: Admin CRUD with images, public viewing
- **FAQ System**: Categories with ordered questions, accordion display
- **Contact Form**: Email notifications to admin

### Forum System

- Discussion threads with rich content
- Reply system with inline editing
- Thread pinning (admin only)
- Sorting by newest/most replies
- Thread favorites (bookmark threads)
- Author information display

### Admin Panel

- Dashboard with real-time statistics
- User management (promote/demote admins)
- News article management
- FAQ and category management

---

## 🚀 Setup Instructions

### Requirements

- PHP 8.2+
- Composer
- Node.js & NPM
- SQLite (default) or MySQL/PostgreSQL

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jeremy-Luyckfasseel/pitstop.git
cd pitstop

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Environment setup
cp .env.example .env
php artisan key:generate

# 5. Database setup (creates tables and seeds data)
php artisan migrate:fresh --seed

# 6. Link storage for file uploads
php artisan storage:link

# 7. Build frontend assets
npm run build

# 8. Start the development server
php artisan serve
```

Visit `http://localhost:8000` or your configured URL.

---

## 📊 Database Relationships

```
User ──┬── hasMany ──> NewsItem
       ├── hasMany ──> Thread
       ├── hasMany ──> Reply
       └── belongsToMany ──> Thread (favorites)

Thread ──┬── belongsTo ──> User (author)
         ├── hasMany ──> Reply
         └── belongsToMany ──> User (favoritedBy)

Reply ──┬── belongsTo ──> User (author)
        └── belongsTo ──> Thread

FaqCategory ──── hasMany ──> Faq
```

---

## 🛠️ Technologies Used

| Layer              | Technology            |
| ------------------ | --------------------- |
| **Framework**      | Laravel 11            |
| **Frontend**       | React 18 + TypeScript |
| **SPA Bridge**     | Inertia.js            |
| **UI Components**  | shadcn/ui             |
| **Styling**        | Tailwind CSS          |
| **Database**       | SQLite (default)      |
| **Authentication** | Laravel Fortify       |
| **Testing**        | Pest PHP              |

---

## 📚 Source Credits

- [Laravel Documentation](https://laravel.com/docs) - Eloquent, Controllers, Policies
- [Inertia.js Documentation](https://inertiajs.com) - React integration and routing
- [shadcn/ui](https://ui.shadcn.com) - UI component library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Laravel Breeze](https://github.com/laravel/breeze) - Authentication scaffolding base
- AI Assistance: GitHub Copilot and Claude used for debugging and code suggestions

---

## 📁 Project Structure

```
app/
├── Http/
│   ├── Controllers/       # Route controllers
│   ├── Requests/          # Form validation
│   └── Middleware/        # Auth and admin checks
├── Models/                # Eloquent models
├── Policies/              # Authorization policies
└── Mail/                  # Mailable classes

resources/js/
├── components/            # React UI components
├── layouts/               # App and auth layouts
└── pages/                 # Inertia page components
    ├── admin/             # Admin pages
    ├── forum/             # Forum pages
    ├── news/              # News pages
    ├── profile/           # Profile pages
    └── settings/          # User settings
```

---

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run with coverage
php artisan test --coverage
```

---

## 📄 License

This project is created for educational purposes as part of the EHB curriculum.
