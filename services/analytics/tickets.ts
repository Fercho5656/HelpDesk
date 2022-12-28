import { serverSupabaseClient } from "#supabase/server"
import { CompatibilityEvent } from "h3"

export const totalTicketCountByPriority = async (event: CompatibilityEvent) => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .from('total_open_tickets_by_priority')
    .select('*')
    .single()
  return { data, error }
}

export const ticketCountByPriority = async (event: CompatibilityEvent, startDate?: string, endDate?: string) => {
  const client = serverSupabaseClient(event)
  const { data, error } = await client
    .rpc('open_tickets_by_priority', { "start_date": startDate, "end_date": endDate })
    .single()
  return { data, error }
}