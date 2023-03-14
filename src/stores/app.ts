import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const hasSidebar = ref(true);
  function toggle() {
    hasSidebar.value = !hasSidebar.value;
  }

  return { hasSidebar, toggle };
});
