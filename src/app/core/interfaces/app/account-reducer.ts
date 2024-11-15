import { IAccountInfo } from '@core-interfaces/shared/account';

export enum AccountActions  {
    GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO',
};
  
export type AccountPayloads  = {
    [AccountActions.GET_ACCOUNT_INFO]: IAccountInfo;
      
};