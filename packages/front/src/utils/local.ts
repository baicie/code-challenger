import localforage from 'localforage'

export const local = localforage.createInstance({
  name: 'coder',
  storeName: 'coder',
  version: 1
})

export const setLocal = (key: string, value: any) => {
  return local.setItem(key, JSON.stringify(value))
}

export const getLocal = async <T>(key: string) => {
  return JSON.parse((await local.getItem(key))!) as T
}
