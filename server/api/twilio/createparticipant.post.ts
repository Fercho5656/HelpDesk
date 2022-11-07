import Client from 'twilio'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { identity, conversationSID } = body
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env
  //console.log('TWILIO_ACCOUNT_SID', TWILIO_ACCOUNT_SID)
  //console.log('TWILIO_AUTH_TOKEN', TWILIO_AUTH_TOKEN)
  const client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  console.log(client.conversations.v1.users)
  const addedParticipant = await client.conversations.v1.services(TWILIO_SERVICE_SID)
    .conversations(conversationSID)
    .participants
    .create({ identity: identity })

  /* const addedParticipant = await client.conversations.v1.conversations(conversationSID)
    .participants
    .create({ identity }) */

  return addedParticipant
})