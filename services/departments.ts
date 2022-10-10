import IDepartment from "~~/interfaces/IDepartment"
import { ApiError } from "@supabase/gotrue-js"

const client = useSupabaseClient()

export const getDepartments = async (): Promise<[IDepartment[], ApiError]> => {
  const { data, error } = await client.from('departments').select('*')
  return [data, error]
}