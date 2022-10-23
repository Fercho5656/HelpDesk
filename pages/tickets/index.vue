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
    <main class="mt-10">
      <nav class="flex justify-center mt-5 items-center gap-x-5">
        <ui-select class="md:hidden" v-model="ticketStatusView">
          <template v-for="status in ticketStatus" :key="status.name">
            <option :value="status.value">
              {{status.name}}
            </option>
          </template>
        </ui-select>
        <ul class="hidden w-full md:flex gap-x-5 justify-start">
          <template v-for="status in ticketStatus" :key="status.name">
            <a :href="`#${status.value}`">
              <li class="md:text-lg lg:text-2xl truncate dark:text-gray-200">{{status.name}}</li>
            </a>
          </template>
        </ul>
        <ui-input type="text" placeholder="Buscar Tickets" v-model="searchTicket" />
        <!-- Filter Button -->
      </nav>
    </main>
  </div>
</template>

<script setup lang="ts">
import { PostgrestError } from '@supabase/postgrest-js';
import { getTickets } from '~~/services/tickets/ticket';

const searchTicket = ref<string>('')
const ticketStatusView = ref<string>('')
const tickets = ref<any[] | PostgrestError>([])

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

onBeforeMount(async () => {
  tickets.value = await getTickets()
  console.log(tickets.value)
})
</script>

<style scoped>

</style>