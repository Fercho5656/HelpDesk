import { PostgrestError } from '@supabase/supabase-js'
import IConversation from "~~/interfaces/IConversation";

export const addConversation = async (conversation: IConversation): Promise<any[] | PostgrestError> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from('conversation')
    .insert(conversation)
    .select()
  if (error) {
    return error
  }
  return data
}