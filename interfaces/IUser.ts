export interface IUser {
  id:            string;
  email:         string;
  user_metadata: { [key: string]: any };
  created_at:    string;
  updated_at:    string;
}
