
import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';
import { COOKIES_TYPES } from '@core-constants/cookie';

import { RequestAPI, ResponseAPI } from '@core-interfaces/api/request-response';
import { Detalle, IDeposit, IDepositResponse } from '@core-interfaces/api/deposit';

import { dinHeaderMapper } from '@core-mappers/toApi/dinHeader.mapper';
import { depositMapper } from '@core-mappers/toApi/depositBody.mapper';
import { depositMapperToApp } from '@core-mappers/ApiTo/transaction.mapper';

import { http } from '@core-services/generals/http';

import { handleTryCatch } from '@core-utils/handle-try-catch';
import { getCookie } from '@core-utils/handle-cookie';


interface Parameter {
    accountUser:string
    accountDestination:string,
    customerUser:string,
    amount: string;
}

export const depositAccountService = async({ amount, accountUser, accountDestination, customerUser }: Parameter)  => {

  const url = urlResources.depositAccount;

  const dinHeader = dinHeaderMapper({
    ip: 'localhost', 
  });

  const dinBody = await depositMapper({
    amount, 
    accountUser, 
    accountDestination, 
    customerUser
  });
  const bodyRequest: RequestAPI<IDeposit> = { dinHeader, dinBody };
  const token = getCookie(COOKIES_TYPES.TOKEN_API);

  const [ response, error ] = await handleTryCatch( 
    http<RequestAPI<IDeposit>, ResponseAPI<IDepositResponse<Detalle>>>({
      url, 
      method: HTTP_METHODS.POST, 
      data: bodyRequest, 
      token
    }) 
  );
  
  if(error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  const dataMapped = await depositMapperToApp(response.data.dinBody);
  return {
    ok: true,
    data: dataMapped
  };
};