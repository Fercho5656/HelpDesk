<template>
  <div :class="isAuthor ? 'bg-emerald-800 text-right' : 'bg-gray-700 text-left' " class="flex flex-col rounded-md text-gray-200 p-3">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isAuthor: boolean
}

const props = defineProps<Props>()
</script>

<style scoped>

</style>