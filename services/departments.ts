import IDepartment from "~~/interfaces/IDepartment"
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js"

export const getDepartments = async (): Promise<PostgrestError | IDepartment[]> => {
  const client = useSupabaseClient()
  const { error, data } = await client
    .from<IDepartment>('department')
    .select('*')
  if (error) {
    return error
  }
  return data
}