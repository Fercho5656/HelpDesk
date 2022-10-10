import { ApiError, User, Session } from "@supabase/gotrue-js"
import { SupabaseClient } from "@supabase/supabase-js"

interface IUserInfo {
  fullName: string
  email: string
  password: string
  birthday: string
  profilePic: File
  departmentId: number
}

// const client = useSupabaseClient()

export const login = async (client: SupabaseClient, email: string, password: string): Promise<[User, ApiError]> => {
  const { user, error } = await client.auth.signIn({ email, password })
  return [user, error]
}

export const signUp = async (client: SupabaseClient, userInfo: IUserInfo): Promise<[User, Session, ApiError | Error]> => {
  const { email, password, profilePic, ...userData } = userInfo
  // uploads the profile pic to supabase storage
  const { data, error: profilePicError } = await client
    .storage
    .from('profile-pics')
    .upload(`${email}_profile_pic.png`, profilePic, {
      cacheControl: '3600',
      upsert: false
    })
  if (profilePicError) {
    return [null, null, profilePicError]
  }
  const { user, session, error } = await client.auth.signUp({
    email,
    password
  },
    {
      data: {
        ...userData
      },
    })
  if (error) {
    return [null, null, error]
  }
  return [user, session, error]
}