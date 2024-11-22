import { act } from 'react';
import { Mock } from 'vitest';
import { useNavigate } from 'react-router-dom';
import { renderHook } from '@testing-library/react';

import { useAuth } from '@core-hooks/hook-auth/useAuth';
import { LoginUserService } from '@core-services/auth/loginUser.service';
import { renderMockAuthContext } from 'test/mocked-functions/render-wrapper-auth-provider';


vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@core-services/auth/loginUser.service', () => ({
  LoginUserService: vi.fn(),
}));

vi.mock('@core-utils', () => ({
  setKeySessionStorage: vi.fn(),
  removeKeySessionStorage: vi.fn(),
  setCookie: vi.fn(),
  removeCookie: vi.fn(),
}));

 
describe('<useAuth />', () => {

 
  const mockNavigate = vi.fn();
  const mockedLoginResponse: Awaited<ReturnType<typeof LoginUserService>>  =  {
    ok: true,
    data: {
      username: 'testUser',
      cuentas: [ { 
        id: 1 , 
        amount: 100, 
        createdAt: new Date(), 
        customer: null, 
        number: 12,
        customerId:1,
        deleted: false
      } ],
      roles: [ 'VIP' ],
      token: 'mockToken',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });


  test('Logs in a user and updates the state', async () => {

    // ==> Initial state
    const mockUser = {
      userName: 'testUser', 
      password: 'testPassword',
      role: [ 'VIP' ],
    };
    
    // ==> Mocks functions and custom hooks
    vi.mocked(LoginUserService as Mock).mockResolvedValue(mockedLoginResponse);
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAuthContext({
      stateMock: { user: null, token: null },
      mockDispatch
    });
    const { result } = renderHook(() => useAuth(), { wrapper: wrapperMock });
    
    // ==> Call loginUser
    await act(async () => {
      await result.current.loginUser(mockUser.userName, mockUser.password);
    });

    expect( LoginUserService ).toHaveBeenCalledWith({ 
      userName: mockUser.userName,
      password: mockUser.password 
    });

    expect( mockDispatch ).toHaveBeenCalledWith({
      type: 'LOGIN',
      payload: {
        user: { 
          userName: mockUser.userName, 
          role: mockUser.role 
        },
        token: 'mockToken',
      },
    });

    expect( result.current.user ).toEqual({
      userName: mockUser.userName, 
      role: mockUser.role 
    });
    expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
    
    
  });
  

  test.todo('should return the logoutUser function');
  test.todo('should return the isAuthenticated');
  test.todo('should return the isLoading');
  test.todo('should return the error');

});