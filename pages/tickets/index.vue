<template>
  <div class=" m-10 col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-10">
    <header class="w-full flex justify-between items-center">
      <h1 class=" text-5xl dark:text-gray-200">Tickets</h1>
      <ui-button color="primary">
        <a href="/tickets/new">
          Abrir Ticket
        </a>
      </ui-button>
    </header>
    <nav class="flex justify-center mt-5 items-center gap-x-5">
      <ui-select class="md:hidden" v-model.number="activeAnchorIndex">
        <template v-for="(status, index) in ticketStatus" :key="status.id">
          <option :value="index">
            {{ status.name }}
          </option>
        </template>
      </ui-select>
      <ul class="hidden w-full md:flex gap-x-5 justify-start">
        <template v-for="(status, index) in ticketStatus" :key="status.name">
          <a :href="`#${status.value}`" :class="activeAnchorIndex === index ? 'border-b-2 border-red-500 pb-0.5' : ''"
            @click="activeAnchorIndex = index">
            <li class="md:text-lg lg:text-2xl truncate dark:text-gray-200">{{ status.name }}</li>
          </a>
        </template>
      </ul>
      <ui-input type="text" placeholder="Buscar Tickets" v-model="searchTicket" />
      <!-- Filter Button -->
    </nav>
    <main class="mt-10">
      <div class=" flex flex-col gap-y-5">
        <template v-for="ticket in ticketsToShow.value" :key="ticket.id">
          <ticket :ticket="ticket" />
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue';
import ITicket from '~~/interfaces/ITicket';

const searchTicket = ref<string>('')
const ticketStatusView = ref<string>('')
const activeAnchorIndex = ref<number>(0)
const ticketsToShow = computed((): ComputedRef<ITicket[]> => {
  if (activeAnchorIndex.value === 0) return openTickets
  if (activeAnchorIndex.value === 1) return assignedToMeTickets
  if (activeAnchorIndex.value === 2) return allTickets
  if (activeAnchorIndex.value === 3) return closedTickets
})
const { allTickets, openTickets, assignedToMeTickets, closedTickets } = useTickets()

const ticketStatus = [
  {
    name: 'Abiertos',
    value: 'open'
  },
  {
    name: 'Asignados a mi',
    value: 'assigned-to-me'
  },
  {
    name: 'Todos',
    value: 'all'
  },
  {
    name: 'Cerrados',
    value: 'closed'
  }
]

</script>

<style scoped>

</style>