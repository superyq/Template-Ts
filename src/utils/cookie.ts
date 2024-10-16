import Cookies from "js-cookie";

const TokenKey = "YQ-Token";
const ExpiresInKey = "YQ-Expires-In";

export const getToken = () => Cookies.get(TokenKey);
export const setToken = (token: string) => Cookies.set(TokenKey, token);
export const removeToken = () => Cookies.remove(TokenKey);

export const getExpiresIn = () => Cookies.get(ExpiresInKey) || -1;
export const setExpiresIn = (time: number) => Cookies.set(ExpiresInKey, time);
export const removeExpiresIn = () => Cookies.remove(ExpiresInKey);

export const getCookie = (key: string) => Cookies.get(key);
export const setCookie = (key: string, value: any) => Cookies.set(key, value);
export const removeCookie = (key: string) => Cookies.remove(key);
