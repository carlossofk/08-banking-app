import { encriptarAES } from '@core-utils/handle-encrypt-parameters';

interface purchaseMapperParams {
  amount: string;
  accountUser: string;
  customerUser: string;
}
export const purchaseMapper = async ( { 
  amount, 
  accountUser, 
  customerUser 
}: purchaseMapperParams ) => { 

  const cuentaOrigenEncriptada = await encriptarAES(accountUser);
  const customerEncriptado = await encriptarAES(customerUser); 

  return {
    cuentaOrigen: cuentaOrigenEncriptada,
    monto:amount,
    customer: customerEncriptado
  };
};