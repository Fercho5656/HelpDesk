<template>
  <div class="bg-gray-50 dark:bg-slate-800 grid grid-cols-12 grid-rows-layout-2">
    <sidebar class="hidden sticky top-0 h-screen overflow-auto col-span-4 md:col-span-3 xl:col-span-2 sm:flex"
      :routes="routes" />
    <div class="col-span-12 sm:col-span-8 sm:mx-3 md:col-span-9 xl:col-span-10">
      <slot />
    </div>
    <sidebar-mobile class="fixed bottom-0 overflow-auto col-span-12 sm:hidden" :routes="routes" />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, TicketIcon } from '@heroicons/vue/24/solid'

const routes = [
  {
    name: 'Inicio',
    icon: HomeIcon,
    path: '/'
  },
  {
    name: 'Analíticas',
    icon: ChartBarIcon,
    path: '/analytics'
  },
  {
    name: 'Tickets',
    icon: TicketIcon,
    path: '/tickets'
  },
  {
    name: 'Chat',
    icon: ChatBubbleOvalLeftEllipsisIcon,
    path: '/chat'
  }
]

</script>

<style scoped>

</style>