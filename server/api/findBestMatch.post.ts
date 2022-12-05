import { serverSupabaseClient } from '#supabase/server'
import ss from 'string-similarity'
import ITicket from '~~/interfaces/ITicket'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const client = serverSupabaseClient(event)
  const { subject } = body
  console.log('subject', subject)
  const targets = await client
    .from('ticket')
    .select('subject, id')
  if (targets.error) {
    return targets.error
  }
  // console.log(targets.data)
  const matches = ss.findBestMatch(subject, targets.data?.map((t: ITicket) => t.subject))
  // add supabase id to every match
  const matchesWithId = matches.ratings.map((m, i) => ({ ...m, id: targets.data[i].id }))
  console.log('matches', matchesWithId)
  return matchesWithId.sort((a, b) => a.rating - b.rating).reverse().slice(0, 3)
})