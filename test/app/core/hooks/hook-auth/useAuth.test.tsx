import { act } from 'react';
import { Mock } from 'vitest';
import { useNavigate } from 'react-router-dom';
import { renderHook } from '@testing-library/react';

import { SESSION_STORAGE_KEYS } from '@core-constants/session-storage';
import { useAuth } from '@core-hooks/hook-auth/useAuth';
import { LoginUserService } from '@core-services/auth/loginUser.service';
import { getKeySessionStorage } from '@core-utils/handle-session-client';

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
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAuthContext({
      stateMock: { user: null, token: null },
      mockDispatch
    });

    const { result } = renderHook(() => useAuth(), { wrapper: wrapperMock });
    
    // ==> Call loginUser
    vi.mocked(LoginUserService as Mock).mockResolvedValue(mockedLoginResponse);
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
  

  test('Should return the logoutUser function', () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAuthContext({
      stateMock: { user: null, token: null },
      mockDispatch
    });
    const { result } = renderHook(() => useAuth(), { wrapper: wrapperMock });

    const logoutUser = result.current.logoutUser;
    expect(logoutUser).toBeDefined();
    expect(logoutUser).toBeInstanceOf(Function);
  });


  test('Should return and toggle isLoading during login', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAuthContext({
      stateMock: { user: null, token: null },
      mockDispatch,
    });
  
    const { result } = renderHook(() => useAuth(), { wrapper: wrapperMock });
  
    // Verify that `isLoading` is false
    expect(result.current.loadinOperations).toBeDefined();
    expect(typeof result.current.loadinOperations).toBe('boolean');
    expect(result.current.loadinOperations).toBe(false);
  
    //  We mock the loginUser function to return a resolved promise
    vi.mocked(LoginUserService as Mock).mockResolvedValue(mockedLoginResponse);
    await act(async () => {
      await result.current.loginUser('testUser', 'testPassword');
    });
  
    expect(result.current.loadinOperations).toBe(false);
  });


  test('Should save in session storage the user and token', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAuthContext({
      stateMock: { user: null, token: null },
      mockDispatch,
    });

    const { result } = renderHook(() => useAuth(), { wrapper: wrapperMock });

    vi.mocked(LoginUserService as Mock).mockResolvedValue(mockedLoginResponse);
    await act(async () => {
      await result.current.loginUser('testUser', 'testPassword');
    });

    expect(getKeySessionStorage(SESSION_STORAGE_KEYS.USER)).toBe(JSON.stringify({ userName:'testUser', role:[ 'VIP' ] }));
    expect(getKeySessionStorage(SESSION_STORAGE_KEYS.TOKEN_API)).toBe(mockedLoginResponse.data.token);
  });


  test('Should not exist user and token in session storage after logout', async () => {
    const mockDispatch = vi.fn();
    const wrapperMock = renderMockAuthContext({
      stateMock: { user: null, token: null },
      mockDispatch,
    });

    const { result } = renderHook(() => useAuth(), { wrapper: wrapperMock });

    vi.mocked(LoginUserService as Mock).mockResolvedValue(mockedLoginResponse);
    await act(async () => await result.current.loginUser('testUser', 'testPassword'));
    expect(getKeySessionStorage(SESSION_STORAGE_KEYS.USER)).toBe(JSON.stringify({ userName:'testUser', role:[ 'VIP' ] }));
    expect(getKeySessionStorage(SESSION_STORAGE_KEYS.TOKEN_API)).toBe(mockedLoginResponse.data.token);

    act( () => result.current.logoutUser() );
    expect(getKeySessionStorage(SESSION_STORAGE_KEYS.USER)).toBe(null);
    expect(getKeySessionStorage(SESSION_STORAGE_KEYS.TOKEN_API)).toBe(null);
  });


});