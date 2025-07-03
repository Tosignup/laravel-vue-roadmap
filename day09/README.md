# Day 09

## Composition API & Type Safety

---

### Break Logic into Composables

- What Are Composables?

  - Composables are **reusable function** that encapsulate logic using the Composition API.
  - They help you:

    - Avoid code duplication
    - Organize logic by concern (e.g. useAuth, useForm, useFetch)
    - Share reactive state and lifecycle hooks across components

- Example: `useCounter.ts`

  ```ts
  import { ref } from "vue";

  export function useCounter() {
    const count = ref(0);
    const increment = () => count.value++;
    const decrement = () => count.value--;

    return { count, increment, decrement };
  }
  ```

- Usage in a Component

  ```vue
  <script setup lang="ts">
  import { useCounter } from "@/composables/useCounter";

  const { count, increment, decrement } = useCounter();
  </script>

  <template>
    <div>
      <p>Count: {{ count }}</p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  </template>
  ```

#### Where to Store Composables

- Recommended Directory: `src/composables/` - This is the **standard convention** in Vue 3 projects (especially with Vite or Nuxt). You can create this folder manually:
  src/
  ├── components/
  ├── composables/ ← ✅ Put your composables here
  │ ├── useAuth.ts
  │ ├── useForm.ts
  │ └── useFetch.ts
  ├── views/
  ├── App.vue
  └── main.ts
- Naming Convention

  - Always prefix with `use` : `useCounter.ts`, `useUser.ts`, `useDarkMode.ts`
  - Use **camelCase** for file names and exports
  - Group related logic into one composable or split into smaller ones if needed
  - Example: `useForm.ts`

    ```ts
    import { reactive } from "vue";

    interface FormData {
      name: string;
      email: string;
    }
    export function useForm() {
      const form = reactive<FormData>({
        name: "",
        email: "",
      });

      const reset = () => {
        form.name = "";
        form.email = "";
      };
    }
    return { form, reset };
    ```

- Usage in Component

  ```vue
  <script setup lang="ts">
  import { useForm } from "@/composables/useForm";

  const { form, reset } = useForm();
  </script>

  <template>
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.email" placeholder="Email" />
    <button @click="reset">Reset</button>
  </template>
  ```

- Bonus tips - If your composables grow large, you can subfolder them:
  composables/
  ├── auth/
  │ └── useLogin.ts
  ├── form/
  │ └── useFormValidation.ts
  └── useTheme.ts
- In Nuxt 3, composables in the `composables/` folder are auto-imported.

### Use Interfaces for Form Types and API Data

- Why Use Interfaces?
  - Interfaces define the **shape of your data**. This improves:
    - Type Safety
    - Code Readability
    - IDE auto-completion
- Example: Form Data Interface

  ```ts
  export interface LoginForm {
    email: string;
    password: string;
  }

  export interface ContactForm {
    name: string;
    email: string;
    message: string;
  }
  ```

- Usage in a Component

  ```vue
  <script setup lang="ts">
  import { reactive } from "vue";
  import type { LoginForm } from "@/types/LoginForm";

  const form = reactive<LoginForm>({
    email: "",
    password: "",
  });

  const contactForm = reactive<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  </script>
  ```

- Example: API Response Interface
  ```ts
  // src/types/User.ts
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  ```
- Fetching API Data with Type Safety

  ```vue
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import type { User } from "@/types/User";

  const user = ref<User | null>(null);

  onMounted(async () => {
    const res = await fetch("/api/user");
    user.value = await res.json();
  });
  </script>
  ```

### Combine: Composable + API Call + Type

- Example **API Composables** with typed result:

  ```ts
  // src/composables/useUser.ts
  import { ref, onMounted } from "vue";

  interface User {
    id: number;
    name: string;
    email: string;
  }

  export function useUser() {
    const user = ref<User[]>([]);
    const loading = ref<boolean>(false);

    async function fetchUsers() {
      loading.value = true;
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = res.json();

      users.value = data;
      loading.value = false;
    }

    onMounted(fetchUsers);

    return { users, loading };
  }
  ```

- Usage in Component

  ```vue
  <script setup lang="ts">
  import { useUsers } from "@/composables/useUsers";

  const { users, loading } = useUsers();
  </script>

  <template>
    <p v-if="loading">loading...</p>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </template>
  ```

### Best Practices

- Use `ref()` for primitives - Keeps reactivity and type safety
- Use `reactive()` for objects - Cleaner syntax for forms and state
- Use interfaces for props/forms - Prevents runtime bugs
- Extract logic into composables - Promotes reuse and separation of concerns
