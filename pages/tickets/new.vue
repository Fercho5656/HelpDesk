<template>
  <div class="m-10 col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-10">
    <h1 class="text-5xl dark:text-gray-200">Nuevo Ticket</h1>
    <form @submit.prevent="onSubmitTicket" class="mt-10 flex flex-col gap-y-8">
      <ui-input v-model="subject" type="text" label="Asunto" placeholder="Olvidé mi contraseña" />
      <ui-textarea v-model="body" label="Descripción" placeholder="Mi contraseña es: 123456" />
      <ui-input-file v-model="file" />
      <fieldset class="flex items-center gap-x-10">
        <ui-select v-model="priorityId" class="w-full" label="Nivel de prioridad">
          <template v-for="priority in ticketPriority">
            <option :value="priority.id">
              {{priority.priority}}
            </option>
          </template>
        </ui-select>
        <ui-button type="button" color="info">¿Qué prioridad elijo?</ui-button>
      </fieldset>
      <ui-select v-model="destinedDepartmentId" class="w-full" label="Departamento">
        <template v-for="department in departments">
          <option :value="department.id">
            {{department.name}}
          </option>
        </template>
      </ui-select>
      <ui-button type="submit">Enviar</ui-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getPriorities } from '~/services/tickets/priorities'
import { getDepartments } from "~/services/departments";
import { sendTicket } from "~/services/tickets/ticket";
import { PostgrestError } from '@supabase/postgrest-js';
import ITicket from '~~/interfaces/ITicket';
const ticketPriority = ref<any[] | PostgrestError>([])
const departments = ref<any[] | PostgrestError>([])

const subject = ref('')
const body = ref('')
const priorityId = ref(0)
const destinedDepartmentId = ref(0)
const file = ref()

onBeforeMount(async () => {
  ticketPriority.value = await getPriorities()
  departments.value = await getDepartments()
})

const onSubmitTicket = async () => {
  const user = useSupabaseUser()
  const ticket: ITicket = {
    subject: subject.value,
    body: body.value,
    priority_id: priorityId.value,
    destined_department_id: destinedDepartmentId.value,
    user_id: user.value.id,
  }
  const sentTicket = await sendTicket(ticket)
  console.log(sentTicket)
}
</script>

<style scoped>

</style>