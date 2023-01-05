import ISupabaseQuery from "~~/interfaces/ISupabaseQuery";
import ITicketQualification from "~~/interfaces/ITicketQualification";

export const sendQualification = async (qualification: ITicketQualification): Promise<ISupabaseQuery<ITicketQualification>> => {
  const client = useSupabaseClient()
  const { data, error } = await client
    .from('ticket_qualification')
    .insert(qualification)
    .single()
  return { data, error }
}