import { PostgrestError } from '@supabase/supabase-js'

export const getPriorities = async (): Promise<any[] | PostgrestError> => {
  const client = useSupabaseClient()

  const { data, error } = await client
    .from('ticket_priority')
    .select('*')
    .order('id', { ascending: true })
  if (error) {
    return error
  }
  return data
}