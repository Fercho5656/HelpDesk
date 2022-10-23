export default interface IConversation {
  id?: number
  created_at?: Date
  twilio_conversation_SID: string
  user_creator_id: string
}