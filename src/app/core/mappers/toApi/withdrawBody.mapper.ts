import { encriptarAES } from '@core-utils/handle-encrypt-parameters';

interface withDrawMapperParams {
  amount: string;
  accountUser: string;
  customerUser: string;
}
export const withDrawBodyMapper = async ( { 
  amount, 
  accountUser, 
  customerUser 
}: withDrawMapperParams ) => { 

  const cuentaOrigenEncriptada = await encriptarAES(accountUser);
  const customerEncriptado = await encriptarAES(customerUser); 

  return {
    cuentaOrigen: cuentaOrigenEncriptada,
    monto:amount,
    customer: customerEncriptado
  };
};