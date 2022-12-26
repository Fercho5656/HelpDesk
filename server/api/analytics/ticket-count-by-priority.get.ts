import { totalTicketCountByPriority, ticketCountByPriority } from '~~/services/analytics/tickets';

export default defineEventHandler(async (event) => {
  const queryParams = useQuery(event)
  const { startDate, endDate } = queryParams

  if (startDate === undefined || endDate === undefined) {
    const { data, error } = await totalTicketCountByPriority(event)
    return { data, error }
  }

  const { data, error } = await ticketCountByPriority(event, startDate.toString(), endDate.toString())

  return { data, error }
})