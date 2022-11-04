<template>
  <header class="w-full flex items-center justify-start gap-x-5">
    <h1 class="dark:text-gray-100 text-5xl font-semibold"> {{ ticket.subject }} </h1>
    <div class="flex items-center gap-x-3">
      <ticket-priority-badge :priority="ticket.priority_id" :is-editable="showEditablePriority" />
      <ticket-status-badge :status="ticket.status_id" v-if="statusComponent" />
      <ticket-status-badge-control @take-ticket="onTakeTicket" @update:status="onUpdateStatus"
        :status="ticket.status_id" v-else />
    </div>
  </header>
</template>

<script setup lang="ts">
import ITicket from '~~/interfaces/ITicket';
import { updateStatus, updateAttendantUser } from '~~/services/tickets/ticket';

definePageMeta({
  middleware: ['check-ticket']
})

const route = useRoute()
const user = useSupabaseUser()
const client = useSupabaseClient()
const ticket = ref<ITicket>(await useTicket(route.params.id as string) as ITicket)
// const ticket: ITicket = await useTicket(route.params.id as string) as ITicket

// If the user is the owner of the ticket, show the status badge else show the status badge control
const statusComponent = computed(() => (ticket.value.user_id === user.value.id))

const showEditablePriority = computed(() => (ticket.value.user_attending_id === user.value.id))

const onUpdateStatus = (newStatus: number) => {
  ticket.value.status_id = newStatus
  updateStatus(ticket.value.id, newStatus)
}

const onTakeTicket = () => {
  ticket.value.user_attending_id = user.value.id
  updateAttendantUser(ticket.value.id, user.value.id)
}

const updateSuscription = client
  .from(`ticket:id=eq.${ticket.value.id}`)
  .on('UPDATE', (payload) => {
    ticket.value = payload.new
  })
  .subscribe()

useHead({
  title: ticket.value.subject
})

</script>

<style scoped>

</style>