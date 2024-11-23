import { COOKIES_TYPES } from '@core-constants/cookie';
import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';

import { depositMapperToApp } from '@core-mappers/ApiTo/transaction.mapper';
import { depositMapper } from '@core-mappers/toApi/depositBody.mapper';
import { dinHeaderMapper } from '@core-mappers/toApi/dinHeader.mapper';

import { http } from '@core-services/generals/http';
import { depositAtmService } from '@core-services/transactions/depositAtm.service';

import { getCookie } from '@core-utils/handle-cookie';
import { handleTryCatch } from '@core-utils/handle-try-catch';


vi.mock('@core-services/generals/http');
vi.mock('@core-mappers/ApiTo/transaction.mapper');
vi.mock('@core-mappers/toApi/dinHeader.mapper');
vi.mock('@core-mappers/toApi/depositBody.mapper');
vi.mock('@core-utils/handle-try-catch');
vi.mock('@core-utils/handle-cookie');

describe('DepositAccountService', () => {
  const parameter = {
    amount: '100',
    accountUser: '123456',
    accountDestination: 'dest123',
    customerUser: 'customer123',
  };

  const mockedHeader = { 
    ip:                   'localhost',
    dispositivo:          'PC',	
    idioma:               'es',
    uuid:                 'mockedUuid',
    horaTransaccion:      'mockedHoraTransaccion',
    llaveSimetrica:       'mockedLlaveSimetrica',	
    vectorInicializacion: 'mockedVectorInicializacion',
  };

  const mockedBody = { 
    cuentaOrigen: 'cuentaOrigenEncriptada',
    cuentaDestino: 'cuentaDestinoEncriptada',
    monto:'amount',
    customer: 'customerEncriptado'
  };

  const mockedToken = 'mockedToken';

  const mockedResponse = { data: { dinBody: { id: 'responseId', status: 'success' } } };
  const mockedMappedResponse = { 
    accountDestination: 'dest123',	
    accountOrigin: +parameter.accountUser,
    balance: 1000,
    typeTransaction: 'deposit',
    taxTransaction: 2,
    amountTransaction: 100,
  };
   

  beforeEach(() => {
    vi.mocked(dinHeaderMapper).mockReturnValue(mockedHeader);
    vi.mocked(depositMapper).mockResolvedValue(mockedBody);
    vi.mocked(getCookie).mockReturnValue(mockedToken);
    vi.mocked(handleTryCatch).mockResolvedValue([ mockedResponse, undefined ]);
    vi.mocked(depositMapperToApp).mockResolvedValue(mockedMappedResponse);
  });
  

  test('Should call http with the correct parameters', async () => {
    await depositAtmService(parameter);

    expect(http).toHaveBeenCalledWith({
      url: urlResources.depositATM,
      method: HTTP_METHODS.POST,
      data: { dinHeader: mockedHeader, dinBody: mockedBody },
      token: mockedToken,
    });
  });


  test('Should handle http errors correctly', async () => {
    const error = new Error('Mocked Error');
    vi.mocked(handleTryCatch).mockResolvedValue([ undefined, error ]);

    const result = await depositAtmService(parameter);

    expect(result).toEqual({
      ok: false,
      message: 'Mocked Error',
    });
  });


  test('Should map the response data correctly', async () => {
    const result = await depositAtmService(parameter);

    expect(depositMapperToApp).toHaveBeenCalledWith(mockedResponse.data.dinBody);
    expect(result).toEqual({
      ok: true,
      data: mockedMappedResponse,
    });
  });


  test('Should call dinHeaderMapper and depositMapper with the correct arguments', async () => {
    await depositAtmService(parameter);

    expect(dinHeaderMapper).toHaveBeenCalledWith({ ip: 'localhost' });
    expect(depositMapper).toHaveBeenCalledWith({
      amount: parameter.amount,
      accountUser: parameter.accountUser,
      accountDestination: parameter.accountDestination,
      customerUser: parameter.customerUser,
    });
  });

  test('Should retrieve the token from cookies', async () => {
    await depositAtmService(parameter);

    expect(getCookie).toHaveBeenCalledWith(COOKIES_TYPES.TOKEN_API);
  });
});