<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'danger' | 'no-bg';
  disabled?: boolean;
}>();

const emit = defineEmits(['click']);

const variant = props.variant || 'primary';

const buttonClass = computed(() => {
  switch(variant) {
    case 'no-bg':
      return 'text-slate-950';
    case 'secondary':
      return 'bg-gray-500 text-white hover:bg-gray-700';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-700';
    default:
      return 'bg-blue-500 text-white hover:bg-blue-700';
  }
});
</script>
<template>
  <button
  :type="props.type || 'button'"
  @click="$emit('click')"
  :disabled="props.disabled"
  class="px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
  :class="buttonClass"
  >
  {{ props.label }}
  </button>
</template>
