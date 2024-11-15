import { AccountActions, AccountPayloads } from '@core-interfaces/app/account-reducer';
import { IAccountInfo } from '@core-interfaces/shared/account';

// ==> Cases State
export const accountCases = {
  [AccountActions.GET_ACCOUNT_INFO]: (state: IAccountInfo, payload: AccountPayloads['GET_ACCOUNT_INFO']): IAccountInfo => {
    return {
      ...state,
      ...payload,
    };
  },

};