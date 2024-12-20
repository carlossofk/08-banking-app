
import { COOKIES_TYPES } from '@core-constants/cookie';
import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';
import { RequestAPI, ResponseAPI } from '@core-interfaces/api/request-response';
import { Detalle, IWithdraw, IWithdrawResponse } from '@core-interfaces/api/withdraw';
import { withdrawMapperToApp } from '@core-mappers/ApiTo/transaction.mapper';

import { dinHeaderMapper } from '@core-mappers/toApi/dinHeader.mapper';
import { withDrawBodyMapper } from '@core-mappers/toApi/withdrawBody.mapper';

import { http } from '@core-services/generals/http';
import { getCookie } from '@core-utils/handle-cookie';
import { handleTryCatch } from '@core-utils/handle-try-catch';

interface Parameter {
    accountUser:string
    customerUser:string,
    amount: string;
}

export const withdrawService = async({ amount, accountUser, customerUser }: Parameter)  => {

  const url = urlResources.withdrawalATM;

  const dinHeader = dinHeaderMapper({
    ip: 'localhost', 
  });

  const dinBody = await withDrawBodyMapper({
    amount, 
    accountUser, 
    customerUser
  });

  const bodyRequest: RequestAPI<IWithdraw> = { dinHeader, dinBody };
  const token = getCookie(COOKIES_TYPES.TOKEN_API);

  const [ response, error ] = await handleTryCatch( 
    http<RequestAPI<IWithdraw>, ResponseAPI<IWithdrawResponse<Detalle>>>({
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

  const dataMapped = await withdrawMapperToApp(response.data.dinBody);
  return {
    ok: true,
    data: dataMapped
  };
};