import { PostgrestError } from "@supabase/supabase-js";
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery";
import ITicket from "~~/interfaces/ITicket";
import ITicketQualification from "~~/interfaces/ITicketQualification";

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
    .select('*, conversation(*)')
    .eq('id', id)

  if (error) {
    return error
  }
  return data[0]
}

export const updateStatus = async (id: number, newStatus: number): Promise<ITicket | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .update({ status_id: newStatus })
    .eq('id', id)
  if (error) {
    return error
  }
  return data[0]
}

export const updatePriority = async (id: number, newPriority: number): Promise<ITicket | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .update({ priority_id: newPriority })
    .eq('id', id)
  if (error) {
    return error
  }
  return data[0]
}

export const updateAttendantUser = async (id: number, user_attending_id: string): Promise<ITicket | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .update({ user_attending_id })
    .eq('id', id)
  if (error) {
    return error
  }
  return data[0]
}

export const updateConversationId = async (id: number, conversation_id: number): Promise<ITicket | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .update({ conversation_id })
    .eq('id', id)
  if (error) {
    return error
  }
  return data[0]
}

export const updateQualification = async (id: number, qualification_id: number): Promise<ISupabaseQuery<ITicket>> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket')
    .update({ qualification_id })
    .eq('id', id)
    .single()
  return { data, error }
}