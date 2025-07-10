# Day 14

## Auth with Laravel Sanctum

---

### Backend: Laravel Sanctum Setup

1.  Install Sanctum

    ```bash
    composer require laravel/sanctum
    ```

2.  Publish config
    ```bash
        php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
    ```
3.  Migrate Sanctum Tables
    ````bash
        php artisan migrate
        ```
    ````
4.  Enable CORS properly Make sure `config/cors.php` includes:

    ```php
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'supports_credentials' => true,
    'allowed_origins' => ['http://localhost:3000'], // your Vue dev server

    ```

5.  Create Auth Routes in `routes/api.php`:

    - See in [`routes/api.php`](../laravel-backend/backend/routes/api.php)
    - Create the `AuthController` via:

    ```bash
        php artisan make:controller AuthController
    ```

    - Inside [`AuthController.php`](../laravel-backend/backend/app/Http/Controllers/AuthController.php), add:

    ```php
        public function login(Request $request)
        {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (!Auth::attempt([$credentials])) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            $request->session()->regenerate();

            return response()->json(Auth::user());
        }

        public function logout(Request $request)
        {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['message' => 'Logged out']);
        }
        //import what needs to be imported
    ```

---

### Frontend: Vue Auth with TS

1. Axios Setup make sure `withCredentials: true` in enabled.

2. Auth Store (Pinia Skeleton for Day 15) Create `AuthStore.ts`:

   ```ts
   import { defineStore } from "pinia";
   import { ref } from "vue";
   import { api } from "@composables/useAxios";

   export const useAuthStore = defineStore("auth", () => {
     const user = ref(null);

     const login = async (email: string, password: string) => {
       await api.get("/sanctum/csrf-cookie"); //initialzie cookie
       const res = await api.post("/api/login", { email, password });
       user.value = res.data;
     };

     const logout = async () => {
       await api.post("/api/logout");
       user.value = null;
     };

     return { user, login, logout };
   });
   ```
