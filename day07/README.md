# Day 07

## Props & Refs in TypeScript

---

### `defineProps`

- What it does:
  - `defineProps` is a **compiler macro** that lets you declare the props your component expects.
  - It returns reactive object containing those props.
- Basic Usage:
  ```vue
  <script setup>
  const props = defineProps(["title"]);
  </script>
  ```
- With TypeScript:
  ```vue
  <script setup lang="ts">
  defineProps<{ title: string; count?: number }>();
  </script>
  ```
- Why it's useful:
  - Enables **type checking** and **auto-correction**
  - Cleaner than using the `props` option in the Option API
  - Work seamlessly with `<script setup>`

### `defineEmits`

- What it does:
  - `defineEmits` declares **custom events** your component can emit.
  - It returns an `emit` function you can use to trigger those events.
- Basic Usage:

  ```vue
  <script setup>
  const emit = defineEmits(["submit"]);
  function handleClick() {
    emit("submit");
  }
  </script>
  ```

- With TypeScript:
  ```ts
  <script setup lang="ts">
  const emit = defineEmit<{
    (e: "submit", payload: { email: string }): void;
  }>();
  </script>
  ```
- Why it's useful:
  - Makes your component's API **explicit and self-documenting**
  - Add **type safety** to emitted events
  - Helps vue optimize event handling

### `ref()`

- What it does:

  - `ref()` creates a **reactive reference** to a value.
  - It's ideal for **primitive values** like strings, numbers, booleans, or even null.

- Examples:

  ```ts
  import { ref } from "vue";

  const count = ref<number>(0);
  count.value++;
  ```

- Key points:
  - Always access the value using `.value` in script
  - In templates, Vue automatically unwraps `.value`
  - You can use `ref()` with objects, but `reactive()` is often better for that.

### `reactive()`

- What it does:

  - `reactive()` makes an **entire object or array reactive**.
  - It deeply converts all nested properties into reactive proxies.

- Example:

  ```ts
  import { reactive } from "vue";

  const user = reactive({
    name: "Alice",
    age: 25,
  });

  user.age++; //No .value needed
  ```

- Key points:
  - Use for complex state like objects, arrays, or nested structures
  - No needed for `.value` - You access properties directly
  - Not ideal for primitive values (use `ref()` instead)

### Defining Types with TypeScript

- For `ref()`:
  ```ts
  const name = ref<string>("John");
  const isVisible = ref<boolean>(true);
  ```
- For `reactive()`

  ```ts
  interface User {
    name: string;
    age: number;
  }

  const user = reactive<User>({
    name: "John",
    age: 22,
  });
  ```

- For Template Refs (e.g. DOM elements):
  ```ts
  const inputEl = ref<HTMLInputElement | null>(null);
  ```
- For `defineProps()`

  ```ts
  //Basic Type Declaration
  const props = defineProps<{
    title: string;
    count?: number;
  }>();
  //Using an Interface
  interface Props {
    title: string;
    count?: number;
  }

  const props = defineProps<Props>();

  //With Default Values
  interface Props {
    title?: string;
    tags?: string[];
  }

  const props = withDefaults(defineProps<Props>(), {
    title: "Default Title",
    tags: () => ["vue", "typescript"],
  });
  ```

- `defineEmits()`

  ```ts
  //Basic Event Declaration
  const emit = defineEmits<{
    (e: "submit"): void;
    (e: "cancel"): void;
  }>();

  //With Payload Types
  interface User {
    id: number;
    name: string;
  }

  const emit = defineEmits<{
    (e: "selectUser", user: User): void;
    (e: "deleteUser", id: number): void;
  }>();

  //You can now safely call
  emit("selectUser", { id: 1, name: "John" });
  ```

- Bonus: Importing Types

  - You can import types from other files and use them with `defineProps` and `defineEmits`:

    ```ts
    import type { User } from "./types";

    defineProps<{ user: User }>();
    defineEmits<{ (e: "updateUser", user: User): void }>();
    ```
