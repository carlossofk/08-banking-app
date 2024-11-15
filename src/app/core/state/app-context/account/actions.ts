import { AccountActions, AccountPayloads } from '@core-interfaces/app/account-reducer';

// export const getAccountInfo = () => ({
//   type: AccountActions.GET_ACCOUNT_INFO,
//   payload: undefined
// });

export const depositBranch = (payload:AccountPayloads ['DEPOSIT_BRANCH'] ) => ({
  type: AccountActions.DEPOSIT_BRANCH,
  payload
});

export const depositAccount = ( payload:AccountPayloads['DEPOSIT_ACCOUNT'] ) => ({
  type: AccountActions.DEPOSIT_ACCOUNT,
  payload
});

export const depositATM = ( payload:AccountPayloads['DEPOSIT_ATM'] ) => ({
  type: AccountActions.DEPOSIT_ATM,
  payload
});

export const purchaseOnline = ( payload: AccountPayloads['PURCHASE_ONLINE'] ) => ({
  type: AccountActions.PURCHASE_ONLINE,
  payload
});

export const purchasePhysical = ( payload: AccountPayloads['PURCHASE_PHYSICAL'] ) => ({
  type: AccountActions.PURCHASE_PHYSICAL,
  payload
});