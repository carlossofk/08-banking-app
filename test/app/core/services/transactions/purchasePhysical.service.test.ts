import { vi } from 'vitest';
import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';

import { dinHeaderMapper } from '@core-mappers/toApi/dinHeader.mapper';
import { purchaseMapper } from '@core-mappers/toApi/purchaseBody.mapper';
import { purchaseMapperToApp } from '@core-mappers/ApiTo/transaction.mapper';

import { http } from '@core-services/generals/http';
import { purchasePhysicalService } from '@core-services/transactions/purchasePhysical.service';
import { handleTryCatch } from '@core-utils/handle-try-catch';
import { getCookie } from '@core-utils/handle-cookie';

vi.mock('@core-mappers/toApi/dinHeader.mapper');
vi.mock('@core-mappers/toApi/purchaseBody.mapper');
vi.mock('@core-mappers/ApiTo/transaction.mapper');
vi.mock('@core-services/generals/http');
vi.mock('@core-utils/handle-try-catch');
vi.mock('@core-utils/handle-cookie');

describe('purchasePhysicalService', () => {
  const parameter = {
    amount: '20',
    accountUser: '123456',
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
    monto: '100',
    customer: 'customerEncriptado'
  };
  const mockedToken = 'mockedToken';
  const mockedResponse = { 
    data: { 
      dinBody: { id: 'responseId', status: 'success' } 
    } 
  };
  const mappedResponse = {
    accountOrigin: +parameter.accountUser,
    balance: 1000,
    typeTransaction: 'purchasedPhysical',
    taxTransaction: 0,
    amountTransaction: 100,
  };

  beforeEach(() => {
    vi.mocked(dinHeaderMapper).mockReturnValue(mockedHeader);
    vi.mocked(purchaseMapper).mockResolvedValue(mockedBody);
    vi.mocked(getCookie).mockReturnValue(mockedToken);
    vi.mocked(handleTryCatch).mockResolvedValue([ mockedResponse, undefined ]);
    vi.mocked(purchaseMapperToApp).mockResolvedValue(mappedResponse);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should call dinHeaderMapper with correct parameters', async () => {
    await purchasePhysicalService(parameter);

    expect(dinHeaderMapper).toHaveBeenCalledWith({ ip: 'localhost' });
  });


  test('should call purchaseMapper with correct parameters', async () => {
    await purchasePhysicalService(parameter);

    expect(purchaseMapper).toHaveBeenCalledWith({
      amount: parameter.amount,
      accountUser: parameter.accountUser,
      customerUser: parameter.customerUser,
    });
  });


  test('should call http with the correct parameters', async () => {
    await purchasePhysicalService(parameter);

    expect(http).toHaveBeenCalledWith({
      url: urlResources.purchasePhysical,
      method: HTTP_METHODS.POST,
      data: {
        dinHeader: mockedHeader,
        dinBody: mockedBody,
      },
      token: mockedToken,
    });
  });


  test('should return mapped response when request is successful', async () => {
    const result = await purchasePhysicalService(parameter);
    expect(result).toEqual({
      ok: true,
      data: mappedResponse,
    });

    expect(purchaseMapperToApp).toHaveBeenCalledWith(mockedResponse.data.dinBody);
  });


  test('should handle errors correctly', async () => {
    const error = new Error('Request failed');
    vi.mocked(handleTryCatch).mockResolvedValue([ undefined, error ]);

    const result = await purchasePhysicalService(parameter);
    expect(result).toEqual({
      ok: false,
      message: error.message,
    });
  });
});
