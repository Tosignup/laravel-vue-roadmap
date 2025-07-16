# Day 18 — Filters, Search, Pagination

## ✅ What I Did

- Added Pagination and Search functionality
- In Laravel: updated the index with search query and paginate
- In Vue: updated the booklist with search and paginate buttons, also updated the BookStore for params
- Added DebouncedRefs composable

## 🧩 Commands Used

- `php artisan serve`
- `npm run dev`

## 📝 Key Learnings

- laravel query
- vue debounced

## ⚡️ Gotchas / Debugging

- Had problem in search functionality it turns out it is just a missing `$` sign inside query for `$search` variable
- pagination problem: since laravel takes to params for search and paginate it takes the paginate value to search input

## 📚 Resources / Links

- Always read documentations
- [laravel](https://laravel.com/docs/12.x)
- [vue](https://vuejs.org/guide/introduction.html)

## 🧪 Next Steps / To Do

- Proceed with Sorting + Column Toggles, UI Enhancements
- Add filter functionality when free time
