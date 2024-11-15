import { IUser } from '@core-interfaces/user';

export enum sessionActions  {
    LOGIN = 'LOGIN',
    LOGOUT= 'LOGOUT',
};
  
export type SessionPayloads  = {
      [sessionActions.LOGIN]: {
        user: IUser;
        token: string;
      };
      
      [sessionActions.LOGOUT]:  undefined;  
};