import { AccountActions, AccountPayloads } from '@core-interfaces/app/account-reducer';
import { IAccountInfo } from '@core-interfaces/shared/account';

// ==> Cases State
export const accountCases = {
  // [AccountActions.GET_ACCOUNT_INFO]: (state: IAccountInfo, payload: AccountPayloads['GET_ACCOUNT_INFO']): IAccountInfo => {
  //   return {
  //     ...state,
  //     ...payload,
  //   };
  // },

  [AccountActions.DEPOSIT_BRANCH]: (state: IAccountInfo, payload:AccountPayloads['DEPOSIT_BRANCH']): IAccountInfo => {	
    return {
      ...state,
      balance: payload.balance,
    };
  },

  [AccountActions.DEPOSIT_ACCOUNT]: (state: IAccountInfo, payload:AccountPayloads['DEPOSIT_ACCOUNT']): IAccountInfo => {	
    return {
      ...state,
      balance: payload.balance,
    };
  },

  [AccountActions.DEPOSIT_ATM]: (state: IAccountInfo, payload:AccountPayloads['DEPOSIT_ATM']): IAccountInfo => {	
    return {
      ...state,
      balance: payload.balance,
    };
  },

  [AccountActions.PURCHASE_ONLINE]: (state: IAccountInfo, payload:AccountPayloads['PURCHASE_ONLINE']): IAccountInfo => {	
    return {
      ...state,
      balance: payload.balance,
    };
  },

  [AccountActions.PURCHASE_PHYSICAL]: (state: IAccountInfo, payload:AccountPayloads['PURCHASE_PHYSICAL']): IAccountInfo => {	
    return {
      ...state,
      balance: payload.balance,
    };
  },

};