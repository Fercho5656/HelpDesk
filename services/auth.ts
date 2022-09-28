import { ApiError, User } from "@supabase/gotrue-js"
import { SupabaseClient } from "@supabase/supabase-js"

// const client = useSupabaseClient()

export const login = async (client: SupabaseClient, email: string, password: string): Promise<[User, ApiError]> => {
  const { user, error } = await client.auth.signIn({ email, password })
  return [user, error]
}

export const signUp = async (client: SupabaseClient, email: string, password: string): Promise<[User, ApiError]> => {
  const { user, error } = await client.auth.signUp({ email, password })
  return [user, error]
}