import { Detalle, IDepositResponse } from '@core-interfaces/api/deposit';
import { IPurchaseResponse } from '@core-interfaces/api/purchase';
import { ITransactionMapperToApp } from '@core-interfaces/shared/transaction-mappers';
import { desencriptarAES } from '@core-utils/handle-encrypt-parameters';

export const depositMapperToApp =  async(dataTransaction: IDepositResponse<Detalle>):Promise<ITransactionMapperToApp> => {

  const accountNumber = await desencriptarAES(dataTransaction.cuentaOrigen);
  const accountDestination = await desencriptarAES(dataTransaction.detalle.cuentaDestino);

  return {
    accountDestination,
    accountOrigin: +accountNumber,
    balance: dataTransaction.saldoActual,
    taxTransaction: dataTransaction.detalle.costoDeposito,
    amountTransaction: dataTransaction.detalle.montoDeposito,
  };

};

export const purchaseMapperToApp =  async(dataTransaction: IPurchaseResponse<Detalle>):Promise<ITransactionMapperToApp> => {

  const accountNumber = await desencriptarAES(dataTransaction.cuentaOrigen);
  const accountDestination = await desencriptarAES(dataTransaction.detalle.cuentaDestino);

  return {
    accountDestination,
    accountOrigin: +accountNumber,
    balance: dataTransaction.saldoActual,
    taxTransaction: dataTransaction.detalle.costoDeposito,
    amountTransaction: dataTransaction.detalle.montoDeposito,
  };

};