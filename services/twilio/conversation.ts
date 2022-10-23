import { Client, Conversation, Paginator } from '@twilio/conversations'

/**
 * It creates a new room if it doesn't exist, or joins an existing room if it does
 * @param {string} room - The name of the room you want to create or join.
 * @param {string} accessToken - The access token you get from the server.
 * @returns A promise that resolves to a conversation object.
 */
export const createOrJoinRoom = async (room: string, accessToken: string) => {
  const client = new Client(accessToken)

  return new Promise(resolve => {
    client.on('stateChanged', async state => {
      if (state === 'initialized') {
        let conversation
        try {
          conversation = await client.createConversation({ uniqueName: room })
          conversation.join()
        } catch (e) {
          // If the room already exists, join it
          console.error(e)
          try {
            conversation = await client.getConversationByUniqueName(room)
            //conversation.add(client.user.identity)
          } catch (e) {
            console.error(e)
          }
        }
        console.log(conversation)
        resolve(conversation)
      }
    })
  })
}

/**
 * It creates a new conversation with the given name, and returns a promise that resolves to the
 * conversation object
 * @param {string} conversationName - The name of the conversation you want to create.
 * @param {string} accessToken - The access token you got from the server.
 * @returns A promise that resolves to a conversation object.
 */
export const createConversation = async (conversationName: string, accessToken: string): Promise<Conversation> => {
  const client = new Client(accessToken)
  return new Promise((resolve, reject) => {
    client.on('stateChanged', async state => {
      if (state === 'initialized') {
        try {
          const conversation = await client.createConversation({ uniqueName: conversationName })
          conversation.join()
          resolve(conversation)
        } catch (error) {
          reject({ error, message: 'Error creating conversation, maybe conversation already exists?' })
        }
      }
    })
  })
}

/**
 * It takes a conversationSID and an accessToken, creates a new Client with the accessToken, and then
 * returns a promise that resolves with the conversation object when the client is initialized
 * @param {string} conversationSID - The SID of the conversation you want to join.
 * @param {string} accessToken - The access token you get from the server.
 * @returns The conversation object
 */
export const joinConversation = async (conversationSID: string, accessToken: string) => {
  const client = new Client(accessToken)

  return new Promise((resolve, reject) => {
    client.on('stateChanged', async state => {
      if (state === 'initialized') {
        try {
          const conversation = await client.getConversationBySid(conversationSID)
          resolve(conversation)
        } catch (error) {
          reject({ error, message: 'Error joining conversation, maybe you are not in the conversation?' })
        }
      }
    })
  })
}

/**
 * It returns a promise that resolves to a paginator of conversations
 * @param {string} accessToken - The access token you received from the authentication process.
 * @returns A promise that resolves to a paginator of conversations.
 */
export const getJoinedConversations = async (accessToken: string): Promise<Paginator<Conversation>> => {
  const client = new Client(accessToken)

  return new Promise((resolve, reject) => {
    client.on('stateChanged', async state => {
      if (state === 'initialized') {
        try {
          const conversations = await client.getSubscribedConversations()
          resolve(conversations)
        } catch (error) {
          reject({ error, message: 'Error getting conversations' })
        }
      }
    })
  })
}