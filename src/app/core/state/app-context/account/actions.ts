import { AccountActions } from '@core-interfaces/app/account-reducer';

export const getAccountInfo = () => ({
  type: AccountActions.GET_ACCOUNT_INFO,
  payload: undefined
});