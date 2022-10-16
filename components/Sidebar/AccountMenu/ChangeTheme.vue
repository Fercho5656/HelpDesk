<template>
  <button @click="toggleDark()"
    class="p-3 w-full flex gap-x-3 justify-center items-center dark:hover:bg-gray-700 transition">
    <p class=" text-gray-700 dark:text-gray-300">Cambiar tema</p>
    <MoonIcon class="w-8 h-8 fill-gray-800 dark:fill-gray-200" v-if="!isDark" />
    <SunIcon class="w-8 h-8 fill-gray-800 dark:fill-gray-200" v-else />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped>

</style>