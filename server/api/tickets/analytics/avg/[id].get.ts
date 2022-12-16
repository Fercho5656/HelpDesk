import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseClient(event)
  const id: number = event.context.params.id
  const { data, error } = await client.rpc('average_resolution_time', { department_id: id })
  if (error) {
    throw error
  }
  return data
})