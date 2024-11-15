import { IAccountInfo } from '@core-interfaces/shared/account';

export enum AccountActions  {
    // GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO',

    DEPOSIT_BRANCH = 'DEPOSIT_BRANCH',
    DEPOSIT_ACCOUNT = 'DEPOSIT_ACCOUNT',
    DEPOSIT_ATM = 'DEPOSIT_ATM',

    PURCHASE_ONLINE = 'PURCHASE_ONLINE',
    PURCHASE_PHYSICAL = 'PURCHASE_PHYSICAL',

    // WITHDRAWAL_ATM = 'WITHDRAWAL_ATM',
};
  
export type AccountPayloads = {
    // [AccountActions.GET_ACCOUNT_INFO]: IAccountInfo;

    [AccountActions.DEPOSIT_BRANCH]: Pick<IAccountInfo, 'balance'>;
    [AccountActions.DEPOSIT_ACCOUNT]:  Pick<IAccountInfo, 'balance'>;	
    [AccountActions.DEPOSIT_ATM]:  Pick<IAccountInfo, 'balance'>;

    [AccountActions.PURCHASE_ONLINE]:  Pick<IAccountInfo, 'balance'>;
    [AccountActions.PURCHASE_PHYSICAL]:  Pick<IAccountInfo, 'balance'>;
};