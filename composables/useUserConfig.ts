import { useStorage } from "@vueuse/core"
import { useUserSettings } from "~~/store/userSettings.store"

export const useUserConfig = () => {
  const userSettings = useUserSettings()
  const dark = ref<boolean>(userSettings.getIsDarkMode)
  onMounted(() => {
    dark.value = userSettings.getIsDarkMode
  })
  return {
    dark,
  }
}