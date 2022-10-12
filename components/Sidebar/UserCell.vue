<template>
  <div class="p-3 flex gap-x-3 justify-center items-center ">
    <img class=" w-10 h-10 rounded-full" :src="img" alt="Foto del perfíl">
    <p class="font-semibold tracking-wider dark:text-gray-200 text-left text-lg">{{ username }}</p>
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