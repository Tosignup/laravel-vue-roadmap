import { ref, watch } from "vue";

export function useDebouncedRef<T>(initial: T, delay = 300) {
  const raw = ref(initial);
  const debounced = ref(initial);

  let timeout: ReturnType<typeof setTimeout>;

  watch(raw, (newVal) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debounced.value = newVal;
    }, delay);
  });

  return { raw, debounced };
}
