import { SupabaseClient } from "@supabase/supabase-js"

export const uploadProfilePic = async (client: SupabaseClient, prefix: string, profilePic: File) => {
  const { data, error: profilePicError } = await client
    .storage
    .from('profile-pics')
    .upload(`${prefix}_profile_pic.png`, profilePic, {
      cacheControl: '3600',
      upsert: false
    })
  if (profilePicError) return [null, null, profilePicError]
}