import { Mock, vi } from 'vitest';
import { getKeySessionStorage, setKeySessionStorage, removeKeySessionStorage } from '@core-utils/handle-session-client';

describe('Session Storage Utilities', () => {

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'removeItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('getKeySessionStorage should retrieve the value for the given key', () => {
    const key = 'testKey';
    const value = 'testValue';

    (sessionStorage.getItem as Mock).mockReturnValueOnce(value);
    
    const result = getKeySessionStorage(key);

    expect(sessionStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });


  test('setKeySessionStorage should store the key-value pair in sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    setKeySessionStorage(key, value);

    expect(sessionStorage.setItem).toHaveBeenCalledWith(key, value);
  });


  test('removeKeySessionStorage should remove the given key from sessionStorage', () => {
    const key = 'testKey';

    removeKeySessionStorage(key);

    expect(sessionStorage.removeItem).toHaveBeenCalledWith(key);
  });


  test('getKeySessionStorage should return null if the key does not exist', () => {
    const key = 'nonExistentKey';

    sessionStorage.getItem = vi.fn().mockReturnValue(null);

    const result = getKeySessionStorage(key);

    expect(sessionStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });
});
