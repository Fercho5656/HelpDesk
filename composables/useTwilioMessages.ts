import IMessage from "~~/interfaces/IMessage"
import { getConversation } from "~~/services/twilio/conversation"

export const useTwilioMessages = async (twilioConversationSID: string, twilioAccessToken: string) => {
  const conversation = await getConversation(twilioConversationSID, twilioAccessToken)
  const messages = await conversation.getMessages()
  const messagesArray = messages.items.map((message: any) => {
    const { attachedMedia, attributes, author, body, dateCreated, dateUpdated,
      index, lastUpdatedBy, media, participantSid, sid, subject, type } = message
    return {
      attachedMedia, attributes, author, body, dateCreated, dateUpdated,
      index, lastUpdatedBy, media, participantSid, sid, subject, type
    } as IMessage
  })

  return { twilioConversation: conversation, messages: messagesArray }
}