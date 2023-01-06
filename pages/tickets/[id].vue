<template>
  <div class="bg-white dark:bg-slate-800">
    <ui-modal :show="showEvaluateTicketModal" @close="showEvaluateTicketModal = false">
      <ticket-feedback-form :ticket-id="ticket.id" />
    </ui-modal>
    <header class="w-full bg-inherit sticky top-0 z-10 mt-3 p-3 flex items-center justify-start gap-x-5">
      <h1 class="dark:text-gray-100 text-3xl font-semibold"> {{ ticket.subject }} </h1>
      <div class="flex items-center gap-x-3 flex-wrap">
        <ticket-priority-badge :priority="ticket.priority_id" :is-editable="showEditablePriority"
          @update:priority="onUpdatePriority" />
        <ticket-status-badge :status="ticket.status_id" @update:status="onUpdateStatus" v-if="statusComponent" />
        <ticket-status-badge-control @take-ticket="onTakeTicket" @update:status="onUpdateStatus"
          :status="ticket.status_id" v-else />
        <ui-button v-if="canFeedback" @click="showEvaluateTicketModal = true">
          Evaluar Ticket
        </ui-button>
      </div>
    </header>
    <main class="py-3 relative">
      <conversation-twilio-not-available v-if="showConversationNotAvailable" />
      <div class="bg-gray-200 dark:bg-slate-700 p-3 sm:rounded-md"
        :class="showConversationNotAvailable ? 'blur pointer-events-none' : ''">
        <conversation-twilio :messages="conversationMessages" />
        <input :disabled="(disableInput)" class="w-full p-1" type="text" v-model="newMessage"
          @keyup.enter="onSendMessage" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import ITicket from '~~/interfaces/ITicket';
import IMessage from '~~/interfaces/IMessage';
import { addConversation, getDatabaseConversation } from '~~/services/conversation';
import { updateStatus, updateAttendantUser, updateConversationId, updatePriority } from '~~/services/tickets/ticket';
import { createConversation, getConversation } from '~~/services/twilio/conversation';
import { useConversationStore } from '~~/store/conversation.store';
import { Conversation } from '@twilio/conversations';

definePageMeta({
  middleware: ['check-ticket']
})

const route = useRoute()
const user = useSupabaseUser()
const client = useSupabaseClient()
const conversationStore = useConversationStore()
const ticket = ref<ITicket>(await useTicket(route.params.id as string) as ITicket)
const disableInput = ref<boolean>(false)
const canFeedback = ref<boolean>(false)

// If the user is the owner of the ticket, show the status badge else show the status badge control
const statusComponent = computed(() => (ticket.value.user_id === user.value.id))
const showEditablePriority = computed(() => (ticket.value.user_attending_id === user.value.id))
const showConversationNotAvailable = computed(() => (ticket.value.conversation_id == null))
const showEvaluateTicketModal = ref<boolean>(false)

const conversation = ref<Conversation | null>(null)
const conversationMessages = ref<Array<IMessage>>([])
const newMessage = ref<string>('')

onMounted(async () => {
  if (ticket.value.conversation_id == null) return
  const twilioConversationSID = ticket.value.conversation.twilio_conversation_SID
  if (ticket.value.status_id === 5) {
    canFeedback.value = (ticket.value.user_id === user.value.id && ticket.value.qualification_id == null)
    disableInput.value = true
    const messages = await useReadOnlyTicket(twilioConversationSID)
    if (messages.error.value) {
      useToast({
        title: 'Error',
        text: 'No se pudo cargar la conversación',
        status: 'error',
        autotimeout: 5000,
        autoclose: true
      })
    }
    return conversationMessages.value = messages.data.value.map(message => {
      return {
        ...message,
        attributes: JSON.parse(message.attributes)
      } as unknown as IMessage
    })
  }
  const { twilioConversation, messages } = await useTwilioMessages(twilioConversationSID, conversationStore.getTwilioAccessToken)
  // @ts-ignore
  conversation.value = twilioConversation
  conversationMessages.value = messages
  conversation.value.on('messageAdded', (message: IMessage) => {
    conversationMessages.value.push(message)
  })
})

const onUpdateStatus = async (newStatus: number) => {
  await updateStatus(ticket.value.id, newStatus)
}

const onUpdatePriority = async (newPriority: number) => {
  await updatePriority(ticket.value.id, newPriority)
}

const onTakeTicket = async () => {
  await updateAttendantUser(ticket.value.id, user.value.id)
  ticket.value.user_attending_id = user.value.id

  const conversationName = `${ticket.value.user_id}-${ticket.value.subject}-${Date.now()}`
  const accessToken: string = conversationStore.getTwilioAccessToken
  const conversation = await createConversation(conversationName, accessToken)

  await conversation.add(ticket.value.user_id)

  const dbConversation = await addConversation({
    twilio_conversation_SID: conversation.sid,
    user_creator_id: ticket.value.user_id
  })

  await updateConversationId(ticket.value.id, dbConversation[0].id)
}

const updateSuscription = client
  .from(`ticket:id=eq.${ticket.value.id}`)
  .on('UPDATE', async (payload) => {
    if (ticket.value.conversation_id !== payload.new.conversation_id) {
      const databaseConversation = await getDatabaseConversation(payload.new.conversation_id)
      const twilioConversationSID = databaseConversation[0].twilio_conversation_SID
      const { twilioConversation, messages } = await useTwilioMessages(twilioConversationSID, conversationStore.getTwilioAccessToken)
      //@ts-ignore
      conversation.value = twilioConversation
      conversationMessages.value = messages
      conversation.value.on('messageAdded', (message: IMessage) => {
        conversationMessages.value.push(message)
      })
    }

    if (ticket.value.status_id !== payload.new.status_id) {
      useToast({
        status: 'success',
        title: 'Estatus Actualizado',
        text: 'El estatus del ticket ha sido actualizado',
        type: 1,
        autoclose: true,
        autotimeout: 3000
      })

    }
    if (ticket.value.priority_id !== payload.new.priority_id) {
      useToast({
        status: 'success',
        title: 'Prioridad Actualizada',
        text: 'La prioridad del ticket ha sido actualizada',
        type: 3,
        autoclose: true,
        autotimeout: 3000
      })

    }
    ticket.value = payload.new
  })
  .subscribe()

const onSendMessage = async () => {
  if (conversation.value == null) return
  if (newMessage.value === '') return // TODO: Show error message
  conversation.value.sendMessage(newMessage.value, { identity: user.value.user_metadata.fullName })
  newMessage.value = ''
}

useHead({
  title: ticket.value.subject
})

</script>

<style scoped>

</style>