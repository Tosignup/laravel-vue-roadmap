# Day 20

## UX Polish

1. Loading Indicators
   - Use your existing `loading` state from `useBooks.ts` or `useAuthStore`:
   ```vue
   <div v-if="loading" class="text-center py-4 text-gray-500">
       Loading Books...
   </div>
   ```
   - Or add a spinner:
   ```vue
   <div v-if="loading" class="flex justify-center py-4">
       <svg class="animate-spin h-6 w-6 text-indigo-600" viewBox="0 0 24 24">...</svg>
   </div>
   ```
2. Form Validation Feedback

   - In `BookForm.vue`, show validation errors:

   ```vue
   <div
     v-if="errors.title"
     class="text-red-500 text-xs"
   >{{ errors.title[0]}}</div>
   ```

   - Update `handleSubmit()` to capture Laravel errors:

   ```ts
   const errors = ref<Record<string, string[]>>({});

   try {
     await createBook(formData);
   } catch (err: any) {
     if (err.response?.status === 422) {
       errors.value = err.response.data.errors;
     }
   }
   ```

3. Route Transitions

   - Add smooth transitions between views:

   ```vue
   <template>
     <Transition name="fade" mode="out-in">
       <RouterView />
     </Transition>
   </template>

   <style>
   .fade-enter-active,
   .fade-leave-active {
     transition: opacity 0.3s ease;
   }
   .fade-enter-form,
   .fade-leave-to {
     opacity: 0;
   }
   </style>
   ```

4. Empty States
   - In `BookList.vue`:
   ```vue
   <div v-if="books.length === 0 && !loading" class="text-center text-gray-500">
       No books found. Try adding one!
   </div>
   ```
