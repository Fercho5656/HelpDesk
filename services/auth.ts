import { ApiError, User, Session } from "@supabase/gotrue-js"
import { SupabaseClient } from "@supabase/supabase-js"

interface IUserInfo {
  fullName: string
  email: string
  username: string
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

export const signOut = async (client: SupabaseClient): Promise<ApiError> => {
  const { error } = await client.auth.signOut()
  return error
}