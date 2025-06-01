import { getLocalStorage, StorageKeys, setLocalStorage } from './storageUtils'

export const saveSignature = (address: string, signature: string) => {
  const raw = getLocalStorage(StorageKeys.SIGNATURE)
  const all = raw ? JSON.parse(raw) : {}
  console.log("raw is ", {raw, all})
  all[address] = signature
  setLocalStorage(StorageKeys.SIGNATURE, JSON.stringify(all))
}

export const getSignature = (address: string): string | null => {
  const raw = getLocalStorage(StorageKeys.SIGNATURE)
  if (!raw) return null
  const all = JSON.parse(JSON.parse(raw))
  return all[address] || null
}

export const removeSignature = (address: string) => {
  const raw = getLocalStorage(StorageKeys.SIGNATURE)
  if (!raw) return
  const all = JSON.parse(raw || '{}')
  delete all[address]
  setLocalStorage(StorageKeys.SIGNATURE, JSON.stringify(all))
}