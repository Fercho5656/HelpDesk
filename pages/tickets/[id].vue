<template>
  <div class="m-10 col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-10">
    <header class="w-full flex items-center justify-start gap-x-5">
      <h1 class="dark:text-gray-100 text-5xl font-semibold"> {{ ticket.subject }} </h1>
      <div class="flex items-center gap-x-3">
        <ticket-priority-badge :priority="ticket.priority_id" :is-editable="showEditablePriority" />
        <ticket-status-badge :status="ticket.status_id" v-if="statusComponent" />
        <ticket-status-badge-control @take-ticket="onTakeTicket" @update:status="onUpdateStatus"
          :status="ticket.status_id" v-else />
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import ITicket from '~~/interfaces/ITicket';
import { updateStatus, updateAttendantUser } from '~~/services/tickets/ticket';

definePageMeta({
  middleware: ['check-ticket']
})

const route = useRoute()
const user = useSupabaseUser()
const ticket: ITicket = await useTicket(route.params.id as string) as ITicket

// If the user is the owner of the ticket, show the status badge else show the status badge control
const statusComponent = computed(() => (ticket.user_id === user.value.id))

const showEditablePriority = computed(() => (ticket.user_attending_id === user.value.id))

const onUpdateStatus = (newStatus: number) => {
  ticket.status_id = newStatus
  updateStatus(ticket.id, newStatus)
}

const onTakeTicket = () => {
  ticket.user_attending_id = user.value.id
  updateAttendantUser(ticket.id, user.value.id)
}

useHead({
  title: ticket.subject
})

</script>

<style scoped>

</style>