# Day 05

## NPM + Vite + Laravel-Vue Setup

---

### NPM + Vite

#### npm (Node Package Manager)

- is the default package manager for **Node.js**. It helps you install, manage, and share reusable code packages (called **modules**) in you JS projects.

- **Key Features**
  - Install packages like `npm install axios`
  - Manage dependencies via `package.json`
  - Run scripts like `npm run dev`
  - Publish your own packages to the npm registry
- **Common Commands**

  ```bash
  npm init # Create new package.json
  npm install # Install all dependencies
  npm install lodash # Install specific package
  npm uninstall lodash # Remove a package
  npm update # Update install packages
  ```

#### Vite

- pronounced "veet"
- a lightweight-fast frontend build tool created by Evan You (creator of Vue.js)
- it's designed to improve the development experience with instant server start and fast hot module replacement (HMR)

- **Why it's Awesome:**
  - Instant dev server with native ES modules
  - Fast HMR for real-time updates
  - Optimized production builds using Rollup
  - Framework-agnostic: works with Vue, React, Svelte, and more
- Basic Usage
  ```bash
  npm create vite@latest my-app
  cd my-app
  npm install
  npm run dev
  ```

---

### Laravel-Vue Setup

#### Integrated Vue via Breeze

- Laravel + Vue scaffolded together using Breeze
- **Best for:** small to medium projects with login UI
- Directory Structure in `resources/js/`

> Run `composer require laravel/breeze --dev`
> Run `php artisan breeze:install vue --typescript`
> Vue is installed inside Laravel and used in routes or components.

- **Use When:**
  - You want Vue + Laravel auth scaffolded automatically
  - You're building a dashboard, user panel, or admin interface
  - You prefer everything in one repo/project
- **Pros:**
  - Quick setup
  - Has login, registration, password reset provided by Breeze
  - Everything works via Blade + Vue Hybrid
- **Cons:**
  - Not ideal for large frontend login
  - Less flexibility than full SPA

#### Vue from scratch in Laravel

- Install Vue manually inside Laravel (no Breeze)
- **Best for:** Custom Laravel apps with Vue sprinkles
- Directory Structure in `resource/js'

> Vue installed manually via Vite + `@vitejs/plugin-vue` > `npm install vue@^3` > `npm install --save-dev vue-loader@^17 @vitejs/plugin-vue`

- **Use When:**
  - You just need Vue in some page/components
  - You're not using Breeze, and want full control
- **Pros:**
  - Lightweight integration
  - You choose exactly how/where Vue is used
- **Cons:**
  - No Auth/Login templates
  - You do all setup manually

#### Standalone Vue SPA

- Standalone Vue 3 project (e.g. Vite + Typyscript), Laravel serves as API
- **Best for:** Fullstack apps, SPAs, mobile-ready frontend
- Directory Structure `vue-frontend/`, 'laravel-backend/'

- **Use When:**
  - You want frontend/backend separation
  - You're building a SPA, PWA, or mobile-first UI
  - You want to deploy frontend (e.g. Netlify) and backend separately (e.g. shared hosting)
- **Pros:**
  - Clean architecture
  - Easier to scale
  - Use Vue Router, Pinia, etc. freely
- **Cons:**
  - Needs CORS setup
  - More steps to deploy and manage
