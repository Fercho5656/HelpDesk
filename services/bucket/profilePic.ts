import { SupabaseClient } from "@supabase/supabase-js"

export const uploadProfilePic = async (client: SupabaseClient, email: string, profilePic: File): Promise<[string, Error]> => {
  const { data, error } = await client
    .storage
    .from('profile-pics')
    .upload(`${email}_profile_pic.png`, profilePic, {
      cacheControl: '3600',
      upsert: false
    })
  if (error) return ['', error]
  return [data.Key, error]
}

export const getProfilePic = (client: SupabaseClient, email: string): [string, Error] => {
  const { data, error } = client
    .storage
    .from('profile-pics')
    .getPublicUrl(`${email}_profile_pic.png`)
  return [data.publicURL, error]
}