# Day 11 — Project Setup (CRUD App)

## ✅ What I Did

- See [day11/README.md](../day11/README.md)

## 🧩 Commands Used

- `php artisan make:model -mrc`
  > -m = for migrations
  > -r = resource controller (CRUD-ready)
  > -c = controller
- `php artisan migrate`
- `php artisan install:api`
- `npm install axios`

## 📝 Key Learnings

- Defining api routes using apiResource
- Migration definition
- Vue installation
- Laravel installation

## ⚡️ Gotchas / Debugging

- Missing `api.php` file in routes directory in Laravel 11 and above
  > run `php artisan install:api` to restore

## 📚 Resources / Links

- Missing [api.php](https://www.techlup.co.ke/blog/understanding-laravel-11s-new-application-structure-missing-apiphp-routes)

## 🧪 Next Steps / To Do

- Implement `BookController` Methods
- Build `Booklist.vue` and `BookForm.vue`
- Connect frontend to backend using Axios
