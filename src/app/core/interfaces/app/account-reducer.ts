import { IBankAccount } from '@core-interfaces/app/account';

export enum AccountActions  {
    // GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO',
    GET_ACCOUNT_SESSION_INFO = 'GET_ACCOUNT_SESSION_INFO',
    DEPOSIT = 'DEPOSIT',
    PURCHASE = 'PURCHASE',
};
  
export type AccountPayloads = {
    [AccountActions.GET_ACCOUNT_SESSION_INFO]: {
        accountInfo: IBankAccount[];
    };

    [AccountActions.DEPOSIT]:  {
        accountNumber: IBankAccount['number'];
        newAmout: IBankAccount['amount'];
    };	

    [AccountActions.PURCHASE]:  {
        accountNumber: IBankAccount['number'];
        newAmout: IBankAccount['amount'];
    };

};