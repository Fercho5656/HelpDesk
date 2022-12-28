import { serverSupabaseClient } from "#supabase/server"
import { CompatibilityEvent } from "h3"
import ISupabaseQuery from "~~/interfaces/ISupabaseQuery"
import ITicketCount from "~~/interfaces/ITicketCount"

export const totalTicketCountByPriority = async (event: CompatibilityEvent) => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .from('total_open_tickets_by_priority')
    .select('*')
    .single()
  return { data, error }
}

export const ticketCountByPriority = async (event: CompatibilityEvent, startDate?: string, endDate?: string): Promise<ISupabaseQuery<ITicketCount>> => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .rpc('open_tickets_by_priority', { "start_date": startDate, "end_date": endDate })
    .single()
  return { data, error }
}