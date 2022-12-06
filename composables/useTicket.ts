import ITicket from "~~/interfaces/ITicket"
import { getTicket } from "~~/services/tickets/ticket"

export const useTicket = async (id: string) => {
  const user = useSupabaseUser()
  const ticket = await getTicket(id) as ITicket

  if (ticket.status_id === 5) return ticket
  if (ticket.user_id === user.value.id) return ticket
  if (ticket.user_attending_id !== null) {
    if (ticket.user_attending_id === user.value.id) return ticket
    const router = useRouter()
    return router.push('/tickets')
  }

  return ticket
}