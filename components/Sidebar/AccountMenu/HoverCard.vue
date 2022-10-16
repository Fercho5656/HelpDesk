<template>
  <div class="border rounded-3xl overflow-hidden border-gray-700 dark:border-gray-50 divide-y dark:divide-gray-50 divide-gray-700">
    <sidebar-account-menu-user-cell :img="img" :username="username" />
    <sidebar-account-menu-change-theme />
    <button class="p-3 w-full overflow-hidden dark:text-gray-200 font-semibold hover:dark:bg-gray-700 transition">
      Cerrar Sesión
    </button>
  </div>
</template>

<script setup lang="ts">

interface Props {
  img: string
  username: string
}

defineProps<Props>()
</script>

<style scoped>

</style>