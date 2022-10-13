<template>
  <div class=" border rounded-3xl overflow-hidden w-fit border-gray-50">
    <sidebar-user-cell :img="img" :username="username" />
    <hr>
    <sidebar-change-theme />
    <hr>
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