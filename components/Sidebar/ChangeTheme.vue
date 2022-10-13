<template>
  <button @click="isDark = !isDark" class="p-3 w-full flex gap-x-3 justify-center items-center dark:hover:bg-gray-700 transition">
    <p class=" text-gray-700 dark:text-gray-300">Cambiar tema</p>
    <component class="w-8 h-8 fill-gray-800 dark:fill-gray-200" :is="darkIcon" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const isDark = ref<boolean>(true)
const darkIcon = computed(() => isDark.value ? SunIcon : MoonIcon)

</script>

<style scoped>

</style>