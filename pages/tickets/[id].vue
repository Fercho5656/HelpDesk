<template>
  <div class="m-10 col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-10">
    <header class="w-full flex items-center justify-start gap-x-5">
      <h1 class="dark:text-gray-100 text-5xl font-semibold"> {{ ticket.subject }} </h1>
      <div class="flex items-center gap-x-3">
        <ticket-priority-badge :change-priority="true" :priority="ticket.priority_id" />
        <p class="dark:text-gray-100"> {{ ticket.status_id }} </p>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import ITicket from '~~/interfaces/ITicket';

definePageMeta({
  middleware: ['check-ticket']
})

const route = useRoute()
const ticket: ITicket = await useTicket(route.params.id as string) as ITicket

useHead({
  title: ticket.subject
})

</script>

<style scoped>

</style>