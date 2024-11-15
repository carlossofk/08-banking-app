import { environment } from 'src/environment/environment';

export const urlResources = {
  
  // ==> login
  login: `${environment.apiUrl}/auth/login`,

  // ==> Deposit
  depositBranch: `${environment.apiUrl}/depositos/sucursal`,
  depositAccount: `${environment.apiUrl}/depositos/cuenta`,
  depositATM: `${environment.apiUrl}/depositos/cajero`,

  // ==> Purchase
  purchaseOnline: `${environment.apiUrl}/compras/web`,
  purchasePhysical: `${environment.apiUrl}/compras/fisico`,

  // ==> Withdraw
  withdrawalATM: `${environment.apiUrl}/retiros/cajero`,
};
