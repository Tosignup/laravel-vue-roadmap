import { ref, onMounted, onUnmounted } from "vue";
import { useEventListener } from "./useEventListener";

export function useMouse() {
  const x = ref<number>(0);
  const y = ref<number>(0);

  function update(event: MouseEvent) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));

  return {useMouse, x, y};
  }

export function useMouseWithEventListener() {
  const x = ref<number>(0);
  const y = ref<number>(0);

  useEventListener(window, 'mousemove', (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  })

  return {x, y}
}
