<template>
  <div class="bg-gray-50 dark:bg-slate-800 h-screen grid grid-cols-12">
    <sidebar :routes="routes" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, TicketIcon } from '@heroicons/vue/24/solid'

const routes = [
  {
    name: 'Home',
    icon: HomeIcon,
    path: '/'
  },
  {
    name: 'Analytics',
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