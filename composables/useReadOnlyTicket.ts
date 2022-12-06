export const useReadOnlyTicket = async (conversationSID: string) => {
  const ticket = await useFetch('/api/twilio/readConversation', {
    method: 'POST',
    body: JSON.stringify({ conversationSID }),
    key: conversationSID,
  })

  return ticket
} 