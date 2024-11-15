export const getKeySessionStorage = (key: string) => {
  return sessionStorage.getItem(key);
};

export const setKeySessionStorage = (key: string, value: string) => {
  return sessionStorage.setItem(key, value);
};

export const removeKeySessionStorage = (key: string) => {
  return sessionStorage.removeItem(key);
};