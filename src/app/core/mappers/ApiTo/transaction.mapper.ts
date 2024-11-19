import { IDepositResponse, Detalle as DetalleDeposit } from '@core-interfaces/api/deposit';
import { IPurchaseResponse, Detalle as DetallePurchase } from '@core-interfaces/api/purchase';
import { IWithdrawResponse , Detalle as DetalleWithdraw } from '@core-interfaces/api/withdraw';
import { ITransactionMapperToApp } from '@core-interfaces/shared/transaction-mappers';
import { desencriptarAES } from '@core-utils/handle-encrypt-parameters';


export const depositMapperToApp =  async(dataTransaction: IDepositResponse<DetalleDeposit>):Promise<ITransactionMapperToApp> => {

  const accountNumber = await desencriptarAES(dataTransaction.cuentaOrigen);
  const accountDestination = await desencriptarAES(dataTransaction.detalle.cuentaDestino);
  return {
    accountDestination,
    accountOrigin: +accountNumber,
    balance: dataTransaction.saldoActual,
    typeTransaction: dataTransaction.detalle.tipoDeposito,
    taxTransaction: dataTransaction.detalle.costoDeposito,
    amountTransaction: dataTransaction.detalle.montoDeposito,
  };

};

export const purchaseMapperToApp =  async(dataTransaction: IPurchaseResponse<DetallePurchase>):Promise<ITransactionMapperToApp> => {

  const accountNumber = await desencriptarAES(dataTransaction.cuentaOrigen);
  const accountDestination = await desencriptarAES(dataTransaction.detalle.cuentaDestino);

  return {
    accountDestination,
    accountOrigin: +accountNumber,
    balance: dataTransaction.saldoActual,
    typeTransaction: dataTransaction.detalle.tipoDeposito,
    taxTransaction: dataTransaction.detalle.costoDeposito,
    amountTransaction: dataTransaction.detalle.montoDeposito,
  };

};

export const withdrawMapperToApp =  async(dataTransaction: IWithdrawResponse<DetalleWithdraw>):Promise<Omit<ITransactionMapperToApp, 'accountDestination'>> => {

  const accountNumber = await desencriptarAES(dataTransaction.cuentaOrigen);

  return {
    accountOrigin: +accountNumber,
    balance: dataTransaction.saldoActual,
    typeTransaction: dataTransaction.detalle.tipoDeposito,
    taxTransaction: dataTransaction.detalle.costoDeposito,
    amountTransaction: dataTransaction.detalle.montoDeposito,
  };
};