<template>
  <div class="input-group">
    <label for="">{{ label }}</label>
    <input :value="modelValue" @input="onInput">
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    label:string;
    modelValue:string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  }
</script>

<style scoped>
  .input-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
