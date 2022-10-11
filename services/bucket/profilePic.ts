import { SupabaseClient } from "@supabase/supabase-js"

export const uploadProfilePic = async (client: SupabaseClient, prefix: string, profilePic: File): Promise<[string, Error]> => {
  const { data, error } = await client
    .storage
    .from('profile-pics')
    .upload(`${prefix}_profile_pic.png`, profilePic, {
      cacheControl: '3600',
      upsert: false
    })
  if (error) return ['', error]
  return [data.Key, error]
}