# Day 16

## Vue Router + Guards(Frontend) + Route Protection (Backend)

---

### Vue Router Guards Setup

- Add Guards Logic in `src/router/index.ts`
  - See in [`router/index.ts`](../vue-frontend/src/router/index.ts)

### Laravel Route Protection

- Protect `/api/books` routes with `auth:sanctum`
  -In `routes/api.php`, wrap resource routes in middleware:
  See in [`routes/api.php`](../laravel-backend/backend/routes/api.php)
- This ensures:
  - Only logged-in users can hit `/api/books`
  - Requests without a valid reason session/token get 401 Unauthorized
