import { AccountActions, AccountPayloads } from '@core-interfaces/app/account-reducer';

export const getAccountSessionInfo = (payload:AccountPayloads ['GET_ACCOUNT_SESSION_INFO'] ) => ({
  type: AccountActions.GET_ACCOUNT_SESSION_INFO,
  payload
}); 

export const deposit = (payload:AccountPayloads ['DEPOSIT'] ) => ({
  type: AccountActions.DEPOSIT,
  payload
});

export const purchase = (payload:AccountPayloads ['PURCHASE'] ) => ({
  type: AccountActions.PURCHASE,
  payload
});

export const withdraw = (payload:AccountPayloads ['WITHDRAW'] ) => ({
  type: AccountActions.WITHDRAW,
  payload
});