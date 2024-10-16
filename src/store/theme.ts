import { defineStore } from "pinia";
import { darkTheme } from "naive-ui";

export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      theme: null,
    };
  },
  getters: {
    isDarkTheme: (state) => {
      return state.theme !== null;
    },
    themeBg() {
      return this.isDarkTheme ? "black" : "white";
    },
  },
  actions: {
    changeTheme() {
      this.theme = this.isDarkTheme ? null : darkTheme;
    },
  },
});
