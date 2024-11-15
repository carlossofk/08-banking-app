import { IUser } from './user';

export interface ISession {
  user:  IUser     | null;	
  token: string    | null;
}