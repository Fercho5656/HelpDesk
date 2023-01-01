import { serverSupabaseClient } from '#supabase/server'
import ss from 'string-similarity'
import ITicket from '~~/interfaces/ITicket'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const client = serverSupabaseClient(event)
  const { subject }: { subject: string } = body
  console.log('subject', subject)
  const targets = await client
    .from('ticket')
    .select('subject, id')
  if (targets.error) {
    return targets.error
  }
  const matches = ss.findBestMatch(subject.toLocaleLowerCase(), targets.data?.map((t: ITicket) => t.subject.toLocaleLowerCase()))
  // add supabase id to every match
  const matchesWithId = matches.ratings.map((m, i) => ({ ...m, id: targets.data[i].id }))
  const sortedMatches = matchesWithId.sort((a, b) => b.rating - a.rating).slice(0, 3)
  console.log('matches', sortedMatches)
  return sortedMatches
})