<template>
  <button @click="changeTheme" class="p-3 w-full flex gap-x-3 justify-center items-center dark:hover:bg-gray-700 transition">
    <p class=" text-gray-700 dark:text-gray-300">Cambiar tema</p>
    <component class="w-8 h-8 fill-gray-800 dark:fill-gray-200" :is="darkIcon" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { useUserSettings } from '~~/store/userSettings.store';

const userSettings = useUserSettings()
const isDark = ref<boolean>(true)
const darkIcon = computed(() => isDark.value ? SunIcon : MoonIcon)

onMounted(() => {
  isDark.value = userSettings.getIsDarkMode
})

const changeTheme = () => {
  isDark.value = !isDark.value
  userSettings.setDarkMode(isDark.value)
  localStorage.setItem('userSettings', JSON.stringify(userSettings.getConfig))
}

</script>

<style scoped>

</style>