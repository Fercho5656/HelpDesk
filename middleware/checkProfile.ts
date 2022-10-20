import { getProfile } from "~~/services/profile"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const client = useSupabaseClient()
  const { id } = to.params
  try {
    const profile = await getProfile(client, id as string)
    console.log('profile', profile)
  } catch (error) {
    return navigateTo("/", { redirectCode: 404 })
  }
  return
})