# Day 06

## Intro to Vue with Typescript

---

### Vue setup

- **Vue.js** is a progressive JS framework used to build **user interfaces** and **single-page application(SPAs)**.
- Vue focuses on the **view layer**, making it easy to integrate with other libraries or existing projects.
- **Core Concepts**
  - Declarative Rendering - You describe what the UI should look like, and Vue takes care of updating the DOM when data changes.
  ```html
  <div id="app">{{ message }}</div>
  ```
  ```js
  const app = Vue.createApp({
    data() {
      return { message: "Hello Vue" };
    },
  }).mount("#app");
  ```
  - Reactive - Vue automatically tracks dependencies and updates the DOM when data changes - no manual DOM manipulation needed.
  - Component-Based Architecture - Vue encourages building UIs with **reusable components**, making your code modular and maintainable.
  - Two-way Data Binding - with `v-model`, form inputs stay in sync with your data:
    ```html
    <input v-model="name" />
    <p>Hello, {{name}}!</p>
    ```
  - Directives - Vue extends HTML with special attributes like:
    - `v-if` - conditionally render elements
    - `v-for` - loop through data
    - `v-on` or `@` - handle events
- Why use Vue?
  - **Easy to learn:** Clean syntax and gentle learning curve
  - **Lightweight:** Small bundle size and fast performance
  - **Flexible:** Use it for small widgets and full SPAs
  - **Great tooling:** Devtools, CLI, and ecosystem support
- How to start

  - **Option 1: CDN (Quick Start)**

    ```html
    <script src="https://unpkg.com/vue@3"></script>
    ```

  - **Option 2: npm + Vite(Recommended for Projects)**
    ```bash
        npm create vue@latest my-vue-app --template vue
        cd my-vue-app
        npm install
        npm run dev
    ```

- Project Structure Overview
  my-vue-ts-app/
  ├── public/ # Static assets
  ├── src/
  │ ├── assets/ # Images, styles
  │ ├── components/ # Vue components
  │ ├── App.vue # Root component
  │ ├── main.ts # Entry point
  │ └── env.d.ts # Type declarations
  ├── index.html # HTML template
  ├── package.json # npm config
  ├── tsconfig.json # TypeScript config
  └── vite.config.ts # Vite config

- Bonus Tips
  - **Type Safety:** You'll get full IntelliSense and type checking in `.vue` files.
  - **Script Setup:** Use `<script setup lang="ts">` for a cleaner syntax.
  - **Component Props:** Define props with types easily:
    ```vue
    <script setup lang="ts">
    defineProps<{ title: string }>();
    </script>
    ```

### What is `<script lang="ts">`?

- In a Vue Single File Component (SFC), this tells Vue that the script block is written in TypeScript, not in plain JS.

  ```vue
  <script lang="ts">
  export default {
    data() {
      return {
        message: "Hello TypeScript!",
      };
    },
  };
  </script>
  ```

  - This enables:
    - Type Checking
    - IntelliSense in your editor
    - Safer, more maintainable code

- When to Use it
  - You want to define types for props, data, emits, etc.
  - You're working in TypeScript-Based Vue project (like one scaffolded with `vue-ts` template)
  - You want better tooling and fewer runtime bugs
- Example: Defining Props with Types

  ```vue
  <script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      title: String,
    },
    setup(props) {
      console.log(props.title); //Type-safe access
    },
  });
  </script>
  ```

  - Or with `<script setup>` syntax (cleaner and more modern):

  ```vue
  <script setup lang="ts">
  defineProps<{ title: string }>();
  </script>
  ```

- Bonus: Typing Refs and Reactive Data

  ```vue
  <script setup lang="ts">
  import { ref } from "vue";

  const count = ref<number>(0);

  function increment() {
    count.value++;
  }
  </script>
  ```

### Manual Component Creation (Vite + Vue)

- This is the most common and flexible method in Vite-based Vue projects.
- Step-by-Step

  1. Create a new file in `src/components/` :
     > src/components/MyButton.vue
  2. Add your component code:

     ```vue
     <template>
       <button @click="handleClick">Click Me</button>
     </template>

     <script setup lang="ts">
     function handleClick() {
       alert("Button clicked!");
     }
     </script>

     <style scoped>
     button {
       padding: 0.5rem 1rem;
       background-color: #42b983;
       color: white;
       border: none;
       border-radius: 4px;
     }
     </style>
     ```

  3. Import and use it in `App.vue` or another component:

     ```vue
     <script setup lang="ts">
     import MyButton from "./components/MyButton.vue";
     </script>

     <template>
       <div>
         <h1>Hello Vue</h1>
         <MyButton />
       </div>
     </template>
     ```

- Bonus Tips
  - Use PascalCase for components filenames: `MyComponent.vue`
  - Use <script setup lang="ts"> for cleaner, type-safe logic
  - Use `defineProps` and `defineEmits` for props and events
