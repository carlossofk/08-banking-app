
import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';
import { RequestAPI, ResponseAPI } from '@core-interfaces/api/request-response';
import { Login, LoginResponse } from '@core-interfaces/api/login';
import { dinHeaderMapper } from '@core-mappers/apiTo/dinHeader.mapper';
import { loginBodyMapper } from '@core-mappers/apiTo/loginBody.mapper';
import { handleTryCatch } from '@core-utils/handle-try-catch';

import { http } from '../generals/http';

interface Parameter {
    userName: string;
    password: string;
}

export const LoginUserService = async({ userName, password }: Parameter)  => {

  const url = urlResources.login;

  const dinHeader = dinHeaderMapper({
    ip: 'localhost', 
    llaveSimetrica: '',       
    vectorInicializacion: '',
  });

  const dinBody = loginBodyMapper({ username: userName, password });
  const bodyRequest: RequestAPI<Login> = { dinHeader, dinBody };

  const [ response, error ] = await handleTryCatch( 
    http<RequestAPI<Login>, ResponseAPI<LoginResponse>>({
      url, 
      method: HTTP_METHODS.POST, 
      data: bodyRequest, 
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