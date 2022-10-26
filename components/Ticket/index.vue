<template>
  <div class=" flex flex-col gap-y-5 p-4 rounded-md bg-slate-200 dark:bg-slate-700 cursor-pointer">
    <header class="flex justify-between">
      <p class="dark:text-gray-100 text-xl font-bold">{{ ticket.subject }}</p>
      <p class="dark:text-gray-100 text-xl font-bold">{{ timeAgo }}</p>
    </header>
    <div>
      <p class="dark:text-gray-200 truncate">{{ ticket.body }}</p>
    </div>
    <footer class="pb-3">
      <ticket-priority-badge :priority="ticket.priority_id" />
    </footer>
  </div>
</template>

<script setup lang="ts">

interface Props {
  ticket: any
}

const props = defineProps<Props>()

const timeAgo = useTimeAgo(new Date(props.ticket.created_at))
</script>

<style scoped>

</style>