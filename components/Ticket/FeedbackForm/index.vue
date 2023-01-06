<template>
  <form @submit.prevent="onSend" class="p-5 flex flex-col gap-y-3">
    <h2 class="text-2xl text-center dark:text-gray-200">Calificación</h2>
    <header class="flex justify-center gap-x-5">
      <div class="flex gap-0">
        <ticket-feedback-form-star-icon :class="`${stars === index + 1 ? 'fill-yellow-500' : 'fill-gray-300'}`"
          v-for="(item, index) in 5" :key="index" @click="stars = index + 1" />
      </div>
    </header>
    <textarea v-model="comment" class="w-full p-3 mt-5 dark:bg-slate-200 dark:text-gray-800"
      placeholder="Escribe un comentario (opcional)" />
    <ui-button class="flex items-center gap-x-3" color="primary" type="submit">
      <paper-airplane-icon class="w-5 h-5" />
      Enviar calificación
    </ui-button>
  </form>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid';
import ITicketQualification from '~~/interfaces/ITicketQualification';
import { sendQualification } from '~~/services/tickets/qualification';
import { updateQualification } from '~~/services/tickets/ticket';
interface Props {
  ticketId: number
}
const props = defineProps<Props>()
const router = useRouter()

const stars = ref<number>(0)
const comment = ref<string>('')

const onSend = async () => {
  if (stars.value === 0) return useToast({
    title: 'Error',
    status: 'error',
    text: 'Debes seleccionar una calificación',
    type: 1,
  })
  const { data: qualificationData, error: qualificationError } = await sendQualification({ stars: stars.value, comment: comment.value })
  const { data, error } = await updateQualification(props.ticketId, (qualificationData as ITicketQualification).id)
  
  if (qualificationError || error) return useToast({
    title: 'Error',
    status: 'error',
    text: 'No se pudo enviar la calificación',
    type: 1,
  })
  useToast({
    title: 'Calificación enviada',
    status: 'success',
    text: 'Gracias por tu calificación',
    type: 1,
  })
  router.push('/tickets')
}
</script>

<style scoped>

</style>