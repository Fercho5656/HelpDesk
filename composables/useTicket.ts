import ITicket from "~~/interfaces/ITicket"
import { getTicket } from "~~/services/tickets/ticket"

export const useTicket = async (id: string) => {
  const user = useSupabaseUser()
  const ticket = await getTicket(id) as ITicket

  /*
  * Security check to make sure that the user is the attendee of the ticket. 
  * If they are not, they are redirected to the tickets page.
  */
  if (ticket.user_attending_id !== null) {
    if (user.value.id !== ticket.user_attending_id) {
      const router = useRouter()
      router.push('/tickets')
    }
  }

  return ticket
}