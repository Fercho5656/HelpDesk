import AccessToken from 'twilio/lib/jwt/AccessToken';

/* Receives a user identity string and returns a twilio valid token. */
export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { identity } = body
  const { TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, TWILIO_SERVICE_SID } = process.env
  const ChatGrant = AccessToken.ChatGrant

  const chatGrant = new ChatGrant({
    serviceSid: TWILIO_SERVICE_SID,
  })

  const token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    { identity: identity }
  )

  token.addGrant(chatGrant)
  return token.toJwt()
})