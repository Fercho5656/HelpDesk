export const useCheckProfile = async (profile: string) => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from('user_info')
    .select('raw_user_data')
    .eq('email', `${profile}@pfatequila.com`)

  if (error) {
    throw error
  }
  return data
}