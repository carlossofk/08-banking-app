
import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';
import { RequestAPI, ResponseAPI } from '@core-interfaces/api/request-response';
import { dinHeaderMapper } from '@core-mappers/apiTo/dinHeader.mapper';
import { handleTryCatch } from '@core-utils/handle-try-catch';

import { http } from '../generals/http';
import { depositMapper } from '@core-mappers/apiTo/depositBody.mapper';
import { Detalle, IDeposit, IDespositResponse } from '@core-interfaces/api/deposit';
import { getCookie } from '@core-utils/handle-cookie';
import { COOKIES_TYPES } from '@core-constants/cookie';

interface Parameter {
    accountUser:string
    accountDestination:string,
    customerUser:string,
    amount: string;
}

export const depositService = async({ amount, accountUser, accountDestination, customerUser }: Parameter)  => {

  const url = urlResources.depositBranch;

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
    http<RequestAPI<IDeposit>, ResponseAPI<IDespositResponse<Detalle>>>({
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

  return {
    ok: true,
    data: response.data.dinBody
  };
};