<template>
  <footer class="bg-gray-50 dark:bg-slate-900">
    <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
      <nav class="-mx-5 -my-2 flex flex-col" aria-label="Footer">
        <ul class="w-full flex flex-col md:flex-row flex-wrap items-center justify-evenly">
          <icons-campo-azul />
          <li class="px-5 py-2" v-for="route in footerRoutes" :key="route.name">
            <a href="#" class="text-lg font-semibold text-gray-400 hover:text-gray-200">
              {{route.name}}
            </a>
          </li>
        </ul>
      </nav>
      <p class="mt-8 text-center text-base text-gray-400">
        &copy; 2021 PFATequila, Inc. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerRoutes = [
  {
    name: 'About',
    path: '#'
  },
  {
    name: 'Blog',
    path: '#'
  },
  {
    name: 'Jobs',
    path: '#'
  },
  {
    name: 'Press',
    path: '#'
  },
  {
    name: 'Privacy',
    path: '#'
  },
  {
    name: 'Terms',
    path: '#'
  },
  {
    name: 'Contact',
    path: '#'
  }
]
</script>

<style scoped>

</style>