
import { COOKIES_TYPES } from '@core-constants/cookie';
import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';
import { RequestAPI, ResponseAPI } from '@core-interfaces/api/request-response';
import { Detalle, IPurchase, IPurchaseResponse } from '@core-interfaces/api/purchase';

import { dinHeaderMapper } from '@core-mappers/apiTo/dinHeader.mapper';
import { purchaseMapper } from '@core-mappers/apiTo/purchaseBody.mapper';

import { http } from '@core-services/generals/http';
import { getCookie } from '@core-utils/handle-cookie';
import { handleTryCatch } from '@core-utils/handle-try-catch';

interface Parameter {
    accountUser:string
    customerUser:string,
    amount: string;
}

export const purchaseService = async({ amount, accountUser, customerUser }: Parameter)  => {

  const url = urlResources.depositBranch;

  const dinHeader = dinHeaderMapper({
    ip: 'localhost', 
  });

  const dinBody = await purchaseMapper({
    amount, 
    accountUser, 
    customerUser
  });

  const bodyRequest: RequestAPI<IPurchase> = { dinHeader, dinBody };
  const token = getCookie(COOKIES_TYPES.TOKEN_API);

  const [ response, error ] = await handleTryCatch( 
    http<RequestAPI<IPurchase>, ResponseAPI<IPurchaseResponse<Detalle>>>({
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