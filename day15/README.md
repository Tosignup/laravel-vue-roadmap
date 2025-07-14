# Day 15

## Pinia + TS Setup

---

1. Install & Configure Pinia

   ```bash
   npm install pinia
   ```

   - then, register it in `main.ts`:

   ```ts
   import {createApp} from 'vue';
   import App from './App.vue';
   import { createPinia } from '/pinia';
   import { router } from './router';

   createApp(App)use.(createPinia()).use(router).mount('#app');
   ```

2. Create Your Book Store (`stores/bookStore.ts)

   - See in [stores/bookStore.ts](../vue-frontend/src/stores/bookStore.ts);

3. How to Use Stores in Components

   ```ts
   import { useBookStore } from "@/stores/bookStore";

   const bookStore = useBookStore();
   bookStore.fetchBooks();
   ```
