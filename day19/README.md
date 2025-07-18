# Day 19

## File Upload + Type Safety

1. Laravel Backend - Secure File Upload
   - In [`BookController.php`](../laravel-backend/backend/app/Http/Controllers/BookController.php):
   - add `'cover_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'` in validation
   - check if cover_image exist during book storing
   - Ensure `storage` is linked:
     ```bash
         php artisan storage:link
     ```
2. Vue Component - Type-Safe Upload Input
   - In your [`BookForm.vue`](../vue-frontend/src/pages/BookForm.vue)
     - update it to accept cover image uploading
3. If you're using Resource in Laravel
   - Ensure that the image is included.
