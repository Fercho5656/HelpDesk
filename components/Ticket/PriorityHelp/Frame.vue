<template>
  <div class="p-5 text-center" :class="priorityStyle">
    <header class="text-2xl font-semibold">
      <slot name="header"></slot>
    </header>
    <div class=text-xl>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

const props = defineProps<Props>()

const priority = ref(props.priority)
const priorityStyle = computed(() => {
  if (priority.value === 'low') return 'bg-green-600 dark:bg-green-300 text-green-50 dark:text-green-800'
  if (priority.value === 'medium') return 'bg-blue-600 dark:bg-blue-300 text-blue-50 dark:text-blue-800'
  if (priority.value === 'high') return 'bg-yellow-600 dark:bg-yellow-300 text-yellow-50 dark:text-yellow-800'
  if (priority.value === 'urgent') return 'bg-red-600 dark:bg-red-300 text-red-50 dark:text-red-800'
})

style: 'bg-green-600 dark:bg-green-300 text-green-50 dark:text-green-800 hover:bg-green-700 dark:hover:bg-green-400'

style: 'bg-blue-600 dark:bg-blue-300 text-blue-50 dark:text-blue-800 hover:bg-blue-700 dark:hover:bg-blue-400'

style: 'bg-yellow-600 dark:bg-yellow-300 text-yellow-50 dark:text-yellow-800 hover:bg-yellow-700 dark:hover:bg-yellow-400'

style: 'bg-red-600 dark:bg-red-300 text-red-50 dark:text-red-800 hover:bg-red-700 dark:hover:bg-red-400'

</script>

<style scoped>

</style>