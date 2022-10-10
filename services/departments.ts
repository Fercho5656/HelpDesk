import IDepartment from "~~/interfaces/IDepartment"
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js"

export const getDepartments = async (client: SupabaseClient): Promise<[PostgrestError, IDepartment[]]> => {
  const { error, data } = await client
    .from<IDepartment>('department')
    .select('*')

  return [error, data]
}