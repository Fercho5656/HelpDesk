<template>
  <span :class="priority.style" class=" rounded-full p-2 px-5 font-bold tracking-wide">
    {{ priority.name }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  priority: number
}

const props = defineProps<Props>()

const PRIORITIES = {
  1: {
    name: 'Baja',
    color: 'green',
    style: 'bg-green-600 dark:bg-green-300 text-green-50 dark:text-green-800'
  },
  2: {
    name: 'Media',
    color: 'blue',
    style: 'bg-blue-600 dark:bg-blue-300 text-blue-50 dark:text-blue-800'
  },
  3: {
    name: 'Alta',
    color: 'yellow',
    style: 'bg-yellow-600 dark:bg-yellow-300 text-yellow-50 dark:text-yellow-800'
  },
  4: {
    name: 'Urgente',
    color: 'red',
    style: 'bg-red-600 dark:bg-red-300 text-red-50 dark:text-red-800'
  }
}

const priority = computed(() => PRIORITIES[props.priority])

</script>

<style scoped>

</style>