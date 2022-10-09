export default defineNuxtRouteMiddleware((to, from) => {
  console.log('to', to)
  console.log('from', from)

  const user = useSupabaseUser()

  if (user.value && to.name === 'auth') return navigateTo('/')

  if (!user.value && to.name === 'auth') return

  if (!user.value) return navigateTo('/auth', { redirectCode: 401 })

})