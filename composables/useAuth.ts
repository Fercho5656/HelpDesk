type PageCredentials = "onlyGuest" | "onlyAuth" | "all";

export default function (pageCredentials: PageCredentials) {
  const user = useSupabaseUser()

  /* Checking if the user is logged in or not.
  If the user is logged in, it will redirect to the home page.
  If the user is not logged in, it will redirect to the login page. 
  If the page is for all users, it will not redirect. */

  onBeforeMount(() => {
    watchEffect(() => {
      if (pageCredentials === "all") return

      if (pageCredentials === 'onlyGuest') {
        if (user.value) return navigateTo('/')
        return
      }

      if (pageCredentials === 'onlyAuth') {
        if (!user.value) return navigateTo('/auth', { redirectCode: 401 })
        return
      }
    })
  })
}