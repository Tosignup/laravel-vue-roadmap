# Day 13

## Advance Vue Router Setup

---

### Vue Router Setup (Vue 3 + TS)

1. Install Vue Router (If not yet)
   ```bash
       npm install vue-router
   ```
2. Create Router File
   - In [`src/router.index.ts`](../vue-frontend/src/router/index.ts)
3. Register Router in `main.ts`

   ```ts
   import { createApp } from "vue";
   import App from "./App.vue";
   import { router } from "./router";

   createA(App).use(router).mount(#app);
   ```

4. Add `<router-view />` in `App.vue`
   ```vue
   <template>
     <main class="p-4">
       <router-view />
     </main>
   </template>
   ```
5. Example Navigation
   - In `BookList.vue`, add a link to edit:
   ```vue
   <RouterLink
     :to="`/books/${book.id}/edit`"
     class="text-blue-500"
   >Edit</RouterLink>
   ```
   - In `BookEdit.vue`, use the route param:
   ```ts
   import { useRoute } from "vue-router";
   const route = useRoute();
   const bookId = Number(route.params.id);
   ```
