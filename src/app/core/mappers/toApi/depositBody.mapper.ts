import { encriptarAES } from '@core-utils/handle-encrypt-parameters';

interface depositMapper {
  amount: string;
  accountUser: string;
  accountDestination: string;
  customerUser: string;
}
export const depositMapper = async ( { 
  amount, 
  accountUser, 
  accountDestination, 
  customerUser 
}: depositMapper ) => { 

  const cuentaOrigenEncriptada = await encriptarAES(accountUser);
  const cuentaDestinoEncriptada = await encriptarAES(accountDestination);
  const customerEncriptado = await encriptarAES(customerUser); 

  return {

    cuentaOrigen: cuentaOrigenEncriptada,
    cuentaDestino: cuentaDestinoEncriptada,
    monto:amount,
    customer: customerEncriptado
  };
};