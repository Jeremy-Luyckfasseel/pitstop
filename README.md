Pitstop 🏎️
Pitstop is een dynamisch forumplatform voor Formule 1-fans, gebouwd met Laravel, Inertia.js en React.

✨ Features
Dit project voldoet aan de volgende functionele vereisten:

Basis Requirements
Authenticatie: Registreren, Inloggen, Wachtwoord resetten (via Laravel Fortify).

Rollen: Systeem voor Admin vs. Gebruiker.

Nieuws: CRUD-systeem voor admins; gebruikers kunnen nieuws lezen (met afbeeldingen).

Profielen: Aanpasbare profielen met avatar upload en bio.

FAQ: Categorieën en vragen (beheerbaar door admin, leesbaar voor iedereen).

Contact: Contactformulier dat emails verstuurt naar de admin.

Extra Features (Pitstop Forum)
Topics: Gebruikers kunnen discussies starten over F1.

Replies: Gebruikers kunnen reageren op topics.

React Frontend: Volledige Single Page Application (SPA) ervaring met Inertia.js.

🚀 Installatie & Lokaal draaien
Volg deze stappen om het project werkend te krijgen:

Vereisten:

PHP 8.2+

Node.js & NPM

SQLite (standaard ingeschakeld)

PowerShell

# 1. Clone de repository
git clone https://github.com/Jeremy-Luyckfasseel/pitstop.git
cd pitstop

# 2. Installeer dependencies
composer install
npm install

# 3. Environment setup
cp .env.example .env
php artisan key:generate

# 4. Database setup (Zorg dat de database.sqlite file bestaat of laat artisan dit doen)
# Dit commando maakt de tabellen aan EN vult de dummy data + admin account
php artisan migrate:fresh --seed

# 5. Start de servers
# Je hebt twee terminals nodig (of gebruik een tool als Herd/Laragon)
npm run dev
php artisan serve
Ga naar http://localhost:8000 (of de URL die je server aangeeft).

📚 Bronvermelding
Voor dit project is gebruik gemaakt van de volgende bronnen:

Laravel Documentatie: Voor Eloquent relaties en Controllers.

Inertia.js Documentatie: Voor de React integratie en routing.

Tailwind UI / CSS: Voor de styling van componenten.

Laravel Breeze/Starter Kit: Als basis voor de authenticatie scaffolding.

AI Assistentie: GitHub Copilot is gebruikt als pair-programmer voor debugging en code-suggesties.

🛠️ Technische Stack
Framework: Laravel 11

Frontend: React + TypeScript (via Inertia.js)

Database: SQLite

Styling: Tailwind CSS

Testing: Pest PHP