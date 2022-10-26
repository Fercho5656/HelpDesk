import { getTicket } from "~~/services/tickets/ticket";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { id } = to.params
  const ticket = await getTicket(id as string)
  if (!ticket) {
    return navigateTo("/", { redirectCode: 404 })
  }
})