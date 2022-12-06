import Client from 'twilio'

export default defineEventHandler(async event => {
  const body = await useBody(event)
  const { conversationSID } = body
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env

  const client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

  const conversation = await client.conversations.v1
    .services(TWILIO_SERVICE_SID)
    .conversations(conversationSID)
    .messages.list()

  return conversation
})