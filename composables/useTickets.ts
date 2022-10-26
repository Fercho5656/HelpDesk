import { PostgrestError } from '@supabase/supabase-js'
import ITicket from '~~/interfaces/ITicket'
import { getTickets } from '~~/services/tickets/ticket'

const STATUS = {
  OPEN: 1,
  IN_PROGRESS: 2,
  RETURNED: 3,
  DELIVERED: 4,
  CLOSED: 5,
}

export const useTickets = () => {
  const user = useSupabaseUser()
  const tickets = useState<ITicket[] | PostgrestError>('tickets', () => [])

  const fetchTickets = async () => {
    if (!user) return
    tickets.value = await getTickets()
  }

  fetchTickets()

  const openTickets = computed(() => {
    const ticketsArray = tickets.value as ITicket[]
    return ticketsArray.filter((ticket) => ticket.status_id = STATUS.OPEN)
  })

  const assignedToMeTickets = computed(() => {
    const ticketsArray = tickets.value as ITicket[]
    return ticketsArray.filter((ticket: ITicket) => ticket.user_attending_id === user.value?.id)
  })

  const closedTickets = computed(() => {
    const ticketsArray = tickets.value as ITicket[]
    return ticketsArray.filter((ticket: ITicket) => ticket.status_id === STATUS.CLOSED)
  })

  const allTickets = computed(() => {
    return tickets.value as ITicket[]
  })


  return {
    allTickets,
    openTickets,
    assignedToMeTickets,
    closedTickets,
  }
}