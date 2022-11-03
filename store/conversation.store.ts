import { defineStore } from 'pinia'

export const useConversationStore = defineStore({
  id: "conversationStore",
  state: (): any => {
    return {
      conversation: null,
      twilioAccessToken: null,
    }
  },
  getters: {
    getConversation: (state: any) => state.conversation,
    getTwilioAccessToken: (state: any) => state.twilioAccessToken,
  },
  actions: {
    setConversation(conversation: any) {
      this.conversation = conversation
    },
    setTwilioAccessToken(twilioAccessToken: string) {
      this.twilioAccessToken = twilioAccessToken
    }
  }
})