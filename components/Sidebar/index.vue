<template>
  <aside class="hidden h-full col-span-4 md:col-span-3 xl:col-span-2 sm:flex flex-col p-5 border-r-[1px]">
    <icons-campo-azul class="mx-auto mb-10" />
    <ul class=" flex flex-col items-center md:items-start gap-y-5">
      <li v-for="route in routes" :key="route.name" class="w-full hover:bg-slate-700 rounded-full transition-all">
        <nuxt-link class="flex items-center gap-x-3 px-5 py-2" :to="route.path">
          <component class="w-10 h-10 fill-black dark:fill-white" :is="route.icon" />
          <p class="hidden md:block text-black dark:text-white text-xl">{{route.name}}</p>
        </nuxt-link>
      </li>
    </ul>
    <button class=" w-10 h-10 mt-auto">
      <SunIcon class=" fill-black dark:fill-white" />
    </button>
  </aside>

</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

interface Props {
  routes: {
    name: string
    icon: any
    path: string
  }[]
}


defineProps<Props>()
</script>

<style scoped>

</style>