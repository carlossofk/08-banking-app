import { IUser } from '../auth/user';

export interface ISession {
  user:  IUser     | null;	
  token: string    | null;
}