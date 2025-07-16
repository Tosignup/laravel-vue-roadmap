# Day 18

## Filters, Search, Pagination

---

1. Backend: Filtering + Pagination in Laravel

   - In your [`BookController`](../laravel-backend/backend/app/Http/Controllers/BookController.php):
   - This ensures every filter/search request gets paginated cleanly and efficiently.

2. Frontend: Debounced Search in TS

   - Create a composable [`useDebouncedRef.ts'](../vue-frontend/src/composables/useDebouncedRef.ts)

3. `BookList.vue` - With Search + Pagination

   - In your [`BookList.vue`](../vue-frontend/src/pages/BookList.vue)

4. Book Store Update
   - In your [`bookStore.ts`](../vue-frontend/src/stores/bookStore.ts)

### Challenge: Add Filters

- Filter by published year range, genre, or favorites
- Laravel: add more `where()` conditions
- Vue: add <select> or checkbox filters and sync with debounce
