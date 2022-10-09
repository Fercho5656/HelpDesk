import { ApiError, User, Session } from "@supabase/gotrue-js"
import { SupabaseClient } from "@supabase/supabase-js"

interface IUserInfo {
  fullName: string
  email: string
  password: string
  birthday: string
  departmentId: number
}

// const client = useSupabaseClient()

export const login = async (client: SupabaseClient, email: string, password: string): Promise<[User, ApiError]> => {
  const { user, error } = await client.auth.signIn({ email, password })
  return [user, error]
}

export const signUp = async (client: SupabaseClient, userInfo: IUserInfo): Promise<[User, Session, ApiError]> => {
  const { email, password, ...userData } = userInfo
  const { user, session, error } = await client.auth.signUp({
    email,
    password
  },
    {
      data: {
        ...userData
      },
    })
  return [user, session, error]
}