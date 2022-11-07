<template>
  <div>
    <header class="w-full flex items-center justify-start gap-x-5">
      <h1 class="dark:text-gray-100 text-5xl font-semibold"> {{ ticket.subject }} </h1>
      <div class="flex items-center gap-x-3">
        <ticket-priority-badge :priority="ticket.priority_id" :is-editable="showEditablePriority" />
        <ticket-status-badge :status="ticket.status_id" v-if="statusComponent" />
        <ticket-status-badge-control @take-ticket="onTakeTicket" @update:status="onUpdateStatus"
          :status="ticket.status_id" v-else />
      </div>
    </header>
    <main>
      <conversation-twilio :messages="conversationMessages" />
      <input type="text" v-model="newMessage" @keyup.enter="onSendMessage" />
    </main>
  </div>
</template>

<script setup lang="ts">
import ITicket from '~~/interfaces/ITicket';
import IMessage from '~~/interfaces/IMessage';
import { addConversation } from '~~/services/conversation';
import { updateStatus, updateAttendantUser, updateConversationId } from '~~/services/tickets/ticket';
import { createConversation, getConversation, joinConversation } from '~~/services/twilio/conversation';
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

// If the user is the owner of the ticket, show the status badge else show the status badge control
const statusComponent = computed(() => (ticket.value.user_id === user.value.id))
const showEditablePriority = computed(() => (ticket.value.user_attending_id === user.value.id))
const showConversationNotAvailable = computed(() => (ticket.value.conversation_id == null))

const conversation = ref<Conversation | null>(null)
const conversationMessages = ref<Array<IMessage>>([])
const newMessage = ref<string>('')

onBeforeMount(async () => {
  if (ticket.value.conversation_id == null) return
  //@ts-ignore
  conversation.value = await getConversation(ticket.value.conversation.twilio_conversation_SID, conversationStore.getTwilioAccessToken)
  const messages = await conversation.value.getMessages()
  conversationMessages.value = messages.items.map((message: any) => {
    const { attachedMedia, attributes, author, body, dateCreated, dateUpdated, index, lastUpdatedBy, media, participantSid, sid, subject, type } = message
    return {
      attachedMedia,
      attributes,
      author,
      body,
      dateCreated,
      dateUpdated,
      index,
      lastUpdatedBy,
      media,
      participantSid,
      sid,
      subject,
      type
    } as IMessage
  })

  conversation.value.on('messageAdded', (message: IMessage) => {
    conversationMessages.value.push(message)
  })
})

const onUpdateStatus = (newStatus: number) => {
  ticket.value.status_id = newStatus
  updateStatus(ticket.value.id, newStatus)
}

const onTakeTicket = async () => {
  ticket.value.user_attending_id = user.value.id
  await updateAttendantUser(ticket.value.id, user.value.id)

  const conversationName = `${ticket.value.user_id}-${ticket.value.subject}-${Date.now()}`
  const accessToken: string = conversationStore.getTwilioAccessToken
  const conversation = await createConversation(conversationName, accessToken)

  try {
    const createParticipant = useFetch('/api/twilio/createparticipant', {
      method: 'POST',
      body: JSON.stringify({
        conversationSID: conversation.sid,
        identity: ticket.value.user_id
      })
    })
  } catch (error) {
    await conversation.add(user.value.id)
  }


  const dbConversation = await addConversation({
    twilio_conversation_SID: conversation.sid,
    user_creator_id: ticket.value.user_id
  })

  await updateConversationId(ticket.value.id, dbConversation[0].id)
}

const updateSuscription = client
  .from(`ticket:id=eq.${ticket.value.id}`)
  .on('UPDATE', (payload) => {
    ticket.value = payload.new
  })
  .subscribe()

const onSendMessage = async () => {
  if (conversation.value === null) return
  if (newMessage.value === '') return // TODO: Show error message
  console.log(`Sending ${newMessage.value}`)
  conversation.value.sendMessage(newMessage.value)
  newMessage.value = ''
}

useHead({
  title: ticket.value.subject
})

</script>

<style scoped>

</style>