import { PostgrestError } from "@supabase/supabase-js";
import ITicket from "~~/interfaces/ITicket";

export const sendTicket = async (ticket: ITicket): Promise<ITicket[] | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .insert({
      ...ticket
    })
    .select()
  if (error) {
    return error
  }
  return data
}

export const getTickets = async (): Promise<ITicket[] | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .select('*')
  if (error) {
    return error
  }
  return data
}

export const getTicket = async (id: string): Promise<ITicket | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .select('*')
    .eq('id', id)
  if (error) {
    return error
  }
  return data[0]
}