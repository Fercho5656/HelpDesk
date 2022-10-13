import { defineStore } from "pinia";

export type RootState = {
  userSettings: {
    isDarkMode: boolean;
  }
}

export const useUserSettings = defineStore({
  id: "userSettings",
  state: (): RootState => {
    return {
      userSettings: {
        isDarkMode: false,
      },
    };
  },
  getters: {
    getIsDarkMode(): boolean {
      return this.userSettings.isDarkMode;
    },
  },
  actions: {
    setDarkMode(isDarkMode: boolean): void {
      this.userSettings.isDarkMode = isDarkMode;
    }
  }
})