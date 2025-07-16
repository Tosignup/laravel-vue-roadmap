# Day 17

## UI with Tailwind CSS

1. Install Tailwind CSS

   - Tailwind with Vite is super smooth:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

   - Then in `tailwindc.config.js`:

   ```js
   export default {
     content: ["./index.html", "./src/**/*.{vue,js,ts}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

   - And in `src/assets/tailwind.css`

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   import it in `main.ts`:

   ```ts
   import `./assets/tailwind.css`;
   ```

2. Style Key Components
   - Do It Yourself and Be Creative

### Bonus Styling Ideas

- Add transition effects with Tailwind's `transitions`, `duration`, `ease-in-out`
- Create a `BaseButton.vue` component to reuse button styles
- Improve mobile layout with responsive utilities like `md:` and `sm:`
