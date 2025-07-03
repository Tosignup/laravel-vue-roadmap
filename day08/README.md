# Day 08

# Day 08

## Two-Way Binding + Events

---

### `v-model` in TS setup

- `v-model` creates a link between the input element and `value` attribute a data value in the Vue instance.
- When you change the input, the data updates and when the data changes, the input updates as well (two-way binding).

#### Two-way binding

- The `v-model` two-way binding functionality could actually be achieved with a combination of `v-bind:value` with `v-on:input` to update the Vue instance data from the input:
  - `v-bind:value` or `:value` to update the input element from the Vue instance data,
  - and `v-on:input` to update the Vue instance data from the input.
- But `v-model` is much easier to use.
- `v-model` is Vue's shorthand for **binding a value** and listening for changes.

  ```vue
  <script setup lang="ts">
  import { ref } from "vue";

  const name = ref<string>("");
  </script>

  <template>
    <input v-model="name" placeholder="Enter your name" />
    <p>Your name is {{ name }}</p>
  </template>
  ```

  - `name` is automatically kept in sync with the input.

#### Use `v-model` in Child Components

- When you want to two-way binding between **parent** <> **child**, the child uses `modelValue` prop and emits `update:modelValue`

  - Child Component

  ```vue
  <script setup lang="ts">
  const props = defineProps<{ modelValue: string }>();
  const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

  const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
  };
  </script>
  <template>
    <input :value="props.modelValue" @input="updateValue" />
  </template>
  ```

  - Parent Component

  ```vue
  <script setup lang="ts">
  import { ref } from "vue";
  import MyInput from "./components/MyInput.vue";

  const name = ref<string>("John");
  </script>

  <template>
    <MyInput v-model="name" />
    <p>Hello, {{ name }}</p>
  </template>
  ```

- Vue automatically binds `v-model` to `modelValue` and listens for `update:modelValue`.

### Emit and Type Event Payloads

- When emitting an event, always **type the payload** for safety:

  ```ts
  const emit = defineEmits<{
    (e: "save", user: { id: number; name: string }): void;
  }>();

  function saveUser() {
    emit("save", { id: 1, name: "John" });
  }
  ```

- Full Breakdown
  ` (e: "save", user: { id: number; name: string })`
  - This defines the shape of the event you're declaring.
    - `e` : This is the name of the event. It's a string literal type, meaning this function only applies when the event name is exactly `'save'`.
    - `save' : The actual event name that your component will emit. You'll use it like:
      ```ts
      emit("save", true);
      ```
    - `visible: boolean` : This is the payload that must be passed when emitting the `'save'` event. It must be a `boolean`.
    - `: void` : This means the function doesn't return anything. It's just used to emit an event - it doesn't produce a value.
