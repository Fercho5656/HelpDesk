import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseClient(event)

  const { data, error } = await client.from('average_resolution_time').select('*')
  if (error) {
    throw error
  }
  return data
})