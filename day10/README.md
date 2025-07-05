# Day 10

## Consuming API with Axios + Types

---

### Axios Response Typing

- Why Type [Axios](AXIOS.md) Responses?
  - Typing Axios response ensures:
    - Type safety for `response.data`
    - Better IntelliSense and auto-completion
    - Fewer runtime bugs
- Example: Typing a GET Request

  ```ts
  import axios, { AxiosResponse } from "axios";

  interface User {
    id: number;
    name: string;
    email: string;
  }

  export async function fetchUsers(): Promise<User[]> {
    const res: AxiosResponse<User[]> = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    return res.data;
  }
  ```

- Bonus: Custom Axios Interface

  ```ts
  import axios from "axios";

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  export default api;
  ```

### Laravel - Create a REST API for Vue

1. Install Laravel

   ```bash
       composer create-project laravel/laravel laravel-backend

   ```

2. Create User Resource & Controller
   ```bash
       php artisan make:controller Api/UserController
       php artisan make:resource UserResource
   ```
3. Define API Route
   ```bash
       php artisan install:api
   ```
   ```php
   //Route/api.php
   use App/Http/Controller/Api/UserController;
   Route::get('/users', [UserController::class, 'index']);
   ```
4. Return JSON from controller

   ```php
   //app/Http/Controller/Api/UserController.php

   use App/Models/User;
   use App/Http/Resources/UserResource;

   public function index()
   {
       return UserResource::collection(User::pagination(10));
   }
   ```

5. Format Response with Resource

   ```php
   // app/Http/Resources/UserResource.php
   public function toArray($request) {
       return [
           'id' => $this->id,
           'name' => $this->name,
           'email' => $this->email,
       ];
   }

   ```

### Vue 3 Consuming Laravel API

    ```vue
    <script setup lang="ts">
    import {ref, onMounted } from 'vue';
    import axios from 'axios';

    interface User {
        id: number;
        name: string;
        email: string;
    }

    const users =ref<User[]>([]);

    onMounted(async () => {
        const res = await axios.get('http://localhost:8000/api/users');
        users.value = res.data.data;
    })
    </script>

    <template>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{user.name}} - {{user.email}}
            </li>

        </ul>

    </template>

    ```
