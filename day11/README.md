# Day 11

## Project Setup (CRUD App)

---

### Backend: Laravel API Setup

1. Create Laravel Project
   ```bash
   composer create-project laravel/laravel laravel-backend
   cd laravel-backend
   ```
2. Set Up Database
   - Configure `.env`
   ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel
    DB_USERNAME=root
    DB_PASSWORD=
   ```
   - Create the database in MySQL/PostgreSQL
3. Create Book Model, Migration, Controller, Resource
   ```bash
   php artisan make:model Book -mrc
   php artisan make:resource BookResource
   ```
4. Define Migration
   - In `datanase/migrations/xxxx_create_books_table.php`:
   ```php
   public function up(): void
   {
       Schema::create('books', function (Blueprint $table) {
           $table->id();
           $table->string('title');
           $table->string('author');
           $table->string('genre')->nullable();
           $table->enum('status', ['To Read', 'Reading', 'Read'])->default('To Read');
           $table->string('cover_image')->nullable();
           $table->timestamps();
       });
   }
   ```
   - Then run:
   ```bash
    php artisan migrate
   ```
5. Set Up API Routes

   > NOTES: if using laravel 11 and above, `api.php` is missing in `routes` directory.
   > Restoring the api.php file, simply run:
   > `php artisan install:api` or use `php artisan help install` to see other routes

   - In `routes/api.php`

   ```php
   use App\Http\Controllers\BookController;
   Route::apiResource('books', BookController::class);
   ```

---

### Frontend: Vue 3 + Typescript Setup

1. Create Projects with Vite
   ```bash
   npm create vite@latest vue-frontend -- --template vue-ts
   cd vue-frontend
   npm install
   ```
   -or
   ```bash
    npm vue@lastet
    //enter Project name or Targer Directory
    //select features to include in your projects e.g. TS, Pinia, Router
    cd projectName
    npm install
    npm install axios
   ```
2. Install Axios + Vue Router + Pinia
   ```bash
       npm install axios vue-router pinia
   ```
3. Project Structure Suggestion
   src/
   ├── assets/
   ├── components/
   │ └── BookCard.vue
   │ └── BookForm.vue
   ├── composables/
   │ └── useBooks.ts
   ├── pages/
   │ └── BookList.vue
   │ └── BookEdit.vue
   ├── router/
   │ └── index.ts
   ├── stores/
   │ └── bookStore.ts
   ├── types/
   │ └── Book.ts
   ├── App.vue
   └── main.ts
4. Create Book Type
   - In `src/types/Book.ts`
   ```ts
   export interface Book {
     id?: number;
     title: string;
     author: string;
     genre?: string;
     status: "To Read" | "Reading" | "Read";
     cover_image?: string;
     created_at?: string;
   }
   ```
5. Set Up Axios Base URL

   - In `src/composables/useAxios.ts`:

   ```ts
   import axios from "axios";

   export const api = axios.create({
     baseURL: "http://localhost:8000/api",
     withCredentials: true,
   });
   ```
