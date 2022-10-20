import { PostgrestError, SupabaseClient } from "@supabase/supabase-js"

export const getProfile = async (client: SupabaseClient, profile: string): Promise<any[] | string | PostgrestError> => {
  const { data, error } = await client
    .from('user_info')
    .select('*')
    .eq('username', profile)
  if (error) {
    throw new Error(error.message)
  }
  if (data?.length === 0) {
    throw new Error(`Profile ${profile} not found`)
  }
  return data
}