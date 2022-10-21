<template>
  <div class="m-10 col-span-12 sm:col-span-8 md:col-span-9 xl:col-span-10">
    <h1 class="text-5xl dark:text-gray-200">Nuevo Ticket</h1>
    <form class="mt-10 flex flex-col gap-y-8">
      <ui-input type="text" label="Asunto" placeholder="Olvidé mi contraseña" />
      <ui-textarea type="textarea" label="Descripción" placeholder="Mi contraseña es: 123456" />
      <ui-input-file />
      <ui-select label="Nivel de prioridad">
        <template v-for="priority in ticketPriority">
          <option :value="priority.id">
            {{priority.priority}}
          </option>
        </template>
      </ui-select>
      <fieldset class="flex items-center gap-x-10">
        <ui-select class="w-full" label="Departamento">
          <template v-for="department in departments">
            <option :value="department.id">
              {{department.name}}
            </option>
          </template>
        </ui-select>
        <ui-button type="primary">¿Qué prioridad elijo?</ui-button>
      </fieldset>
      <ui-button type="primary">Enviar</ui-button>
    </form>
  </div>
</template>

<script setup>
import { getPriorities } from '~/services/tickets/priorities'
import { getDepartments } from "~/services/departments";
const ticketPriority = ref([])
const departments = ref([])
onBeforeMount(async () => {
  ticketPriority.value = await getPriorities()
  departments.value = await getDepartments()
})
</script>

<style scoped>

</style>