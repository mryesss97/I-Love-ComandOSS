import { stripQuotes } from './function';

export enum StorageKeys {
  SIGNATURE = 'signature',
}

export const setLocalStorage = (key: StorageKeys, value: any) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.error(`[storage] Failed to set ${key}:`, err);
  }
};

export const removeLocalStorage = (key: StorageKeys) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`[storage] Failed to remove ${key}:`, err);
  }
};

export const getLocalStorage = (key: StorageKeys) => {
  try {
    const value = localStorage.getItem(key);
    return stripQuotes(value || '');
  } catch (err) {
    console.error(`[storage] Failed to set ${key}:`, err);
  }
};
