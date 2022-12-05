<template>
  <div class="p-3 py-5">
    <h1 class="text-5xl dark:text-gray-200">Nuevo Ticket</h1>
    <form @submit.prevent="onSubmitTicket" class="mt-10 flex flex-col gap-y-8">
      <div class="relative">
        <ui-input @focus="(showSugestions = true)" @blur="(showSugestions = false)" v-model="subject" type="text"
          label="Asunto" placeholder="Olvidé mi contraseña" />
        <div class="absolute z-10 bg-gray-300 w-full rounded-md overflow-hidden" v-show="(showSugestions)">
          <ui-spinner class="p-5" v-show="showSearchingSpinner">
            <template v-slot:default>
              <p>Buscando tickets similares...</p>
            </template>
          </ui-spinner>
          <div class="flex flex-col gap-y-3" v-show="(showSimilarTickets)">
            <header class="p-3 m-0">
              <p class="text-xl font-semibold">Tickets similares</p>
            </header>
            <nuxt-link class="hover:bg-gray-400 p-3" v-for="ticket in (similarTickets as IMatch[])" :key="ticket.id"
              :to="`${ticket.id}`">
              {{ ticket.target }}
            </nuxt-link>
          </div>
        </div>
      </div>
      <ui-textarea v-model="body" label="Descripción" placeholder="Mi contraseña es: 123456" />
      <ui-input-file v-model="file" />
      <fieldset class="flex items-center gap-x-10">
        <ui-select v-model="priorityId" class="w-full" label="Nivel de prioridad">
          <option v-for="priority in ticketPriority" :value="priority.id" :key="priority.id">
            {{ priority.priority }}
          </option>
        </ui-select>
        <ui-button @click="(showPriorityModal = true)" type="button" color="info">¿Qué prioridad elijo?</ui-button>
      </fieldset>
      <ui-select v-model="destinedDepartmentId" class="w-full" label="Departamento">
        <option v-for="department in departments" :value="department.id" :key="department.id">
          {{ department.name }}
        </option>
      </ui-select>
      <ui-button type="submit">Enviar</ui-button>
    </form>
    <ui-modal :show="showPriorityModal" @close="showPriorityModal = false">
      <ticket-priority-help />
    </ui-modal>
  </div>
</template>

<script setup lang="ts">
import { getPriorities } from '~/services/tickets/priorities'
import { getDepartments } from "~/services/departments";
import { sendTicket } from "~/services/tickets/ticket";
import { PostgrestError } from '@supabase/postgrest-js';
import ITicket from '~~/interfaces/ITicket';
import { createConversation } from '~~/services/twilio/conversation';
import IConversation from '~~/interfaces/IConversation';
import { addConversation } from '~~/services/conversation';
import { useConversationStore } from '~~/store/conversation.store';
import IMatch from '~~/interfaces/IMatch';

const conversationStore = useConversationStore()
const ticketPriority = ref<any[] | PostgrestError>([])
const departments = ref<any[] | PostgrestError>([])


const subject = ref('')
const subjectRef = ref<HTMLInputElement>(null)
const body = ref('')
const priorityId = ref(1)
const destinedDepartmentId = ref(1)
const file = ref()
const showPriorityModal = ref<boolean>(false)
const similarTickets = ref([])
const showSugestions = ref(false)
const showSearchingSpinner = ref(false)
const showSimilarTickets = computed(() => similarTickets.value.length > 0)

onBeforeMount(async () => {
  ticketPriority.value = await getPriorities()
  departments.value = await getDepartments()
})

watch(subject, useDebounce(async () => {
  if (subject.value === '') {
    similarTickets.value = []
    showSearchingSpinner.value = false
    return
  }
  showSearchingSpinner.value = true
  const matches = await useFetch('/api/findBestMatch', {
    method: 'POST',
    headers: useRequestHeaders(['cookie']),
    body: JSON.stringify({ subject: subject.value }),
    key: subject.value
  })
  if (matches.error.value) {
    return useToast({
      text: 'Error al buscar tickets similares',
      title: 'Error',
      status: 'info',
      autoclose: true,
      autotimeout: 5000
    })
  }
  showSearchingSpinner.value = false
  similarTickets.value = matches.data.value as IMatch[]
}))

const onSubmitTicket = async () => {
  const router = useRouter()
  const user = useSupabaseUser()

  const ticket: ITicket = {
    subject: subject.value,
    body: body.value,
    priority_id: priorityId.value,
    destined_department_id: destinedDepartmentId.value,
    user_id: user.value.id,
  }
  const sentTicket = await sendTicket(ticket)
  router.push(`/tickets/${sentTicket[0].id}`)
}
</script>

<style scoped>

</style>