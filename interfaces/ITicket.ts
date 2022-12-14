export default interface ITicket {
  id?: number;
  created_at?: Date;
  returned_at?: Date;
  commited_at?: Date;
  conversation?: any;
  closed_at?: Date;
  updated_at?: Date;
  subject: string;
  body: string;
  status_id?: number;
  priority_id: number;
  destined_department_id: number;
  user_id: string;
  user_attending_id?: string;
  conversation_id?: number;
  qualification_id?: number;
}