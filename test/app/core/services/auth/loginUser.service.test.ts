import { HTTP_METHODS } from '@core-constants/http-methods';
import { urlResources } from '@core-constants/url-resources';
import { dinHeaderMapper } from '@core-mappers/toApi/dinHeader.mapper';
import { loginBodyMapper } from '@core-mappers/toApi/loginBody.mapper';
import { LoginUserService } from '@core-services/auth/loginUser.service';
import { http } from '@core-services/generals/http';
import { handleTryCatch } from '@core-utils/handle-try-catch';


vi.mock('@core-services/generals/http');
vi.mock('@core-mappers/toApi/dinHeader.mapper');
vi.mock('@core-mappers/toApi/loginBody.mapper');
vi.mock('@core-utils/handle-try-catch');

describe('LoginUserService', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Should call to dinHeaderMapper with right values', async () => {
    const parameter = { userName: 'testUser', password: 'testPass' };
    const mockedHeader = { 
      ip:                   'localhost',
      dispositivo:          'PC',	
      idioma:               'es',
      uuid:                 'mockedUuid',
      horaTransaccion:      'mockedHoraTransaccion',
      llaveSimetrica:       'mockedLlaveSimetrica',	
      vectorInicializacion: 'mockedVectorInicializacion',
    };
    const mockedBody = { username: 'mockedUser', password: 'mockedPass' };
    const mockedResponse = { data: { dinBody: { token: 'mockedToken' } } };

    vi.mocked(dinHeaderMapper).mockReturnValue(mockedHeader);
    vi.mocked(loginBodyMapper).mockReturnValue(mockedBody);
    vi.mocked(handleTryCatch).mockResolvedValue([ mockedResponse, undefined ]);

    await LoginUserService(parameter);

    expect(dinHeaderMapper).toHaveBeenCalledWith({ ip: mockedHeader.ip });
    expect(loginBodyMapper).toHaveBeenCalledWith({ 
      username: parameter.userName, 
      password: parameter.password 
    });
  });

  test('Should return an object with "ok" property as true and the data property with the response data', async () => {
    const parameter = { userName: 'testUser', password: 'testPass' };
    const mockedHeader = { 
      ip:                   'localhost',
      dispositivo:          'PC',	
      idioma:               'es',
      uuid:                 'mockedUuid',
      horaTransaccion:      'mockedHoraTransaccion',
      llaveSimetrica:       'mockedLlaveSimetrica',	
      vectorInicializacion: 'mockedVectorInicializacion',
    };
    const mockedBody = { username: 'mockedUser', password: 'mockedPass' };
    const mockedResponse = { data: { dinBody: { token: 'mockedToken' } } };

    vi.mocked(dinHeaderMapper).mockReturnValue(mockedHeader);
    vi.mocked(loginBodyMapper).mockReturnValue(mockedBody);
    vi.mocked(handleTryCatch).mockResolvedValue([ mockedResponse, undefined ]);

    const result = await LoginUserService(parameter);

    expect(result).toEqual({ ok: true, data: { token: 'mockedToken' } });
  });

  test('Should return an object with "ok" property as false and the message property with the error message', async () => {
    const parameter = { userName: 'testUser', password: 'testPass' };
    const mockedHeader = { 
      ip:                   'localhost',
      dispositivo:          'PC',	
      idioma:               'es',
      uuid:                 'mockedUuid',
      horaTransaccion:      'mockedHoraTransaccion',
      llaveSimetrica:       'mockedLlaveSimetrica',	
      vectorInicializacion: 'mockedVectorInicializacion',
    };
    const mockedBody = { username: 'mockedUser', password: 'mockedPass' };

    vi.mocked(dinHeaderMapper).mockReturnValue(mockedHeader);
    vi.mocked(loginBodyMapper).mockReturnValue(mockedBody);
    vi.mocked(handleTryCatch).mockResolvedValue([ undefined, Error('Exist a error in the service') ]);

    const result = await LoginUserService(parameter);

    expect(result).toEqual({ ok: false, message: 'Exist a error in the service' });
  }); 

  test('Should call the http with the right parameters', async () => {
    const parameter = { userName: 'testUser', password: 'testPass' };
    const mockedHeader = { 
      ip:                   'localhost',
      dispositivo:          'PC',	
      idioma:               'es',
      uuid:                 'mockedUuid',
      horaTransaccion:      'mockedHoraTransaccion',
      llaveSimetrica:       'mockedLlaveSimetrica',	
      vectorInicializacion: 'mockedVectorInicializacion',
    };
    const mockedBody = { username: 'mockedUser', password: 'mockedPass' };
    const mockedResponse = { data: { dinBody: { token: 'mockedToken' } } };

    vi.mocked(dinHeaderMapper).mockReturnValue(mockedHeader);
    vi.mocked(loginBodyMapper).mockReturnValue(mockedBody);
    vi.mocked(handleTryCatch).mockResolvedValue([ mockedResponse, undefined ]);

    await LoginUserService(parameter);

    expect(http).toHaveBeenCalledWith({
      url: urlResources.login,
      method: HTTP_METHODS.POST,
      data: { dinHeader: mockedHeader, dinBody: mockedBody },
    });
  });
});