import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserSettings = defineStore({
  id: "userSettings",
  state: () => ({
    userSettings: useStorage("userSettings", {
      isDarkMode: false,
    })
  }),
  hydrate(state, initialState) {
    state.userSettings = useStorage("userSettings", {
      isDarkMode: false,
    }).value
  },
  getters: {
    getIsDarkMode(): boolean {
      return this.$state.userSettings.isDarkMode
    },
    getConfig() {
      return this.$state;
    }
  },
  actions: {
    setDarkMode(newDarkMode: boolean): void {
      this.$state.userSettings.isDarkMode = newDarkMode;
    },
    setConfig(config: any): void {
      this.$state = config;
    }
  }
})