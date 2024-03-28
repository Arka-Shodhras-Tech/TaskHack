import CryptoENC from "crypto-js/enc-utf8"
export const id=process.env.REACT_APP_id
export const lock=process.env.REACT_APP_Lock
export const lock1=sessionStorage.lock
export const salt=CryptoENC