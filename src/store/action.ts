import { defineStore } from "pinia";

export const useActionStore = defineStore({
  id: "action",
  state: () => {
    return {
      refreh: true,
    };
  },
  actions: {
    onRefreh() {
      this.refreh = false;
      let timer = null;

      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        this.refreh = true;
      }, 300);
    },
  },
});
