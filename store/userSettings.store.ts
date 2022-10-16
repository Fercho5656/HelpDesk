import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export type RootState = {
  isDarkMode: boolean;
}

export const useUserSettings = defineStore({
  id: "userSettings",
  state: (): RootState => ({
    isDarkMode: useStorage("userSettings/isDarkMode", false).value,
  }),
  hydrate(state, initialState) {
    state = useStorage("userSettings", {} as RootState).value
  },
  getters: {
    getIsDarkMode(): boolean {
      return this.isDarkMode;
    },
    getConfig(): RootState {
      return this.$state;
    }
  },
  actions: {
    setDarkMode(isDarkMode: boolean): void {
      this.isDarkMode = isDarkMode;
    },
    setConfig(config: RootState): void {
      this.$state = config;
    }
  }
})