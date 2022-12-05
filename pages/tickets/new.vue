<template>
  <div class="p-3 py-5">
    <h1 class="text-5xl dark:text-gray-200">Nuevo Ticket</h1>
    <form @submit.prevent="onSubmitTicket" class="mt-10 flex flex-col gap-y-8">
      <ui-input v-model="subject" type="text" label="Asunto" placeholder="Olvidé mi contraseña" />
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

const conversationStore = useConversationStore()
const ticketPriority = ref<any[] | PostgrestError>([])
const departments = ref<any[] | PostgrestError>([])

const subject = ref('')
const body = ref('')
const priorityId = ref(1)
const destinedDepartmentId = ref(1)
const file = ref()
const showPriorityModal = ref<boolean>(false)

onBeforeMount(async () => {
  ticketPriority.value = await getPriorities()
  departments.value = await getDepartments()
})

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