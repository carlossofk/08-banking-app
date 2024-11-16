import { AccountActions, AccountPayloads } from '@core-interfaces/app/account-reducer';
import { IAccountInfo } from '@core-interfaces/app/account';

// ==> Cases State
export const accountCases = {
  [AccountActions.GET_ACCOUNT_SESSION_INFO]: (state: IAccountInfo, payload:AccountPayloads['GET_ACCOUNT_SESSION_INFO']): IAccountInfo => {
    return {
      ...state,
      bankAccounts: payload.accountInfo,
    };
    
  },  

  [AccountActions.DEPOSIT]: (state: IAccountInfo, payload:AccountPayloads['DEPOSIT']): IAccountInfo => {
    const searchedAccount = state?.bankAccounts?.find((account) => account.number === payload.accountNumber);
    if(!searchedAccount) {
      return {
        ...state,
      };
    }
    
    const bankAccountsUpdated = state.bankAccounts.map((account) => {
      if(account.number === payload.accountNumber) {
        return { ...searchedAccount,  amount: payload.newAmout };
      }
      return account;
    });
    return {
      ...state,
      bankAccounts: bankAccountsUpdated,
    };
  },

  [AccountActions.PURCHASE]: (state: IAccountInfo, payload:AccountPayloads['PURCHASE']): IAccountInfo => {	

    const searchedAccount = state?.bankAccounts?.find((account) => account.number === payload.accountNumber);
    if(!searchedAccount) {
      return {
        ...state,
      };
    }
   
    const bankAccountsUpdated = state.bankAccounts.map((account) => {
      if(account.number === payload.accountNumber) {
        return { ...searchedAccount,  amount: payload.newAmout };
      }
      return account;
    });

    return {
      ...state,
      bankAccounts: bankAccountsUpdated,
    };
  },

};