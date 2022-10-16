import { useStorage } from "@vueuse/core"
import { RootState, useUserSettings } from "~~/store/userSettings.store"

export const useUserConfig = () => {
  const userSettings = useUserSettings()
  onMounted(() => {
    const localStorageConfig = useStorage("userSettings", {} as RootState).value
    if (!localStorageConfig) {
      return useStorage('userSettings', userSettings.getConfig)
    }
    userSettings.setConfig(localStorageConfig as RootState)
  })

  const dark = computed(() => userSettings.getIsDarkMode)
  return {
    dark,
  }
}