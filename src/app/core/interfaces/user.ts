
export interface IUser {
  userName: string;
  role:  RolUser[] | null;
}

export type RolUser = 'VIP' | 'USER';

