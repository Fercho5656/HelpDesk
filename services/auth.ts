import { ApiError, User, Session } from "@supabase/gotrue-js"
import { SupabaseClient } from "@supabase/supabase-js"

interface IUserInfo {
  fullName: string
  email: string
  password: string
  birthday: string
}

// const client = useSupabaseClient()

export const login = async (client: SupabaseClient, email: string, password: string): Promise<[User, ApiError]> => {
  const { user, error } = await client.auth.signIn({ email, password })
  return [user, error]
}

export const signUp = async (client: SupabaseClient, userInfo: IUserInfo): Promise<[User, Session, ApiError]> => {
  const { user, session, error } = await client.auth.signUp({
    email: userInfo.email,
    password: userInfo.password,
  },
    {
      data: {
        fullName: userInfo.fullName,
        birthday: userInfo.birthday,
      },
    })
  return [user, session, error]
}