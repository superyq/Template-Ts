import request from "@/utils/request.ts";
import { ILoginPramas } from "@/model/login.ts";

export const login = (params: ILoginPramas) => {
  return request({
    url: "/login",
    method: "post",
    data: params,
  });
};

export const logout = () => {
  return request({
    url: "/logout",
    method: "post",
  });
};

export const getCodeImg = () => {
  return request({
    url: "/code",
    method: "get",
  });
};
