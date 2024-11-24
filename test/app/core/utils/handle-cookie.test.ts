import { vi, Mock } from 'vitest';
import Cookies from 'js-cookie';
import { setCookie, getCookie, removeCookie } from '@core-utils/handle-cookie';

describe('Cookie utilities', () => {
  
  afterEach(() => {
    vi.clearAllMocks(); 
  });

  test('Should set a cookie with the given key and value', () => {
    const key = 'testKey';
    const value = 'testValue';
    const options = { expires: 7 };

    Cookies.set = vi.fn();
    setCookie(key, value, options);

    expect(Cookies.set).toHaveBeenCalledWith(key, value, options);
  });


  test('Should get a cookie with the given key', () => {
    const key = 'testKey';
    const value = 'testValue';

    Cookies.get = vi.fn();
    (Cookies.get as Mock).mockReturnValue(value);

    const result = getCookie(key);

    expect(result).toBe(value);
    expect(Cookies.get).toHaveBeenCalledWith(key);
  });

  test('Should remove a cookie with the given key', () => {
    const key = 'testKey';

    Cookies.remove = vi.fn();
    removeCookie(key);

    expect(Cookies.remove).toHaveBeenCalledWith(key);
  });

});