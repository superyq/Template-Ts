import request from "@/utils/request.ts";

export const getRoleTable = (params: any) => {
  return request({
    url: "/system/menu",
    method: "get",
    params,
  });
};

export const getRoleDetail = (id: any) => {
  return request({
    url: "/system/menu",
    method: "get",
    params: {
      id
    },
  });
}

export const addOrUpdateRole = (params: any) => {
  return request({
    url: "/system/menu",
    method: "get",
    params,
  });
};

export const delRole = (id: any) => {
  return request({
    url: "/system/menu",
    method: "get",
    params: {
      id
    },
  });
};

export const changeStatus = (data: any) => {
  return request({
    url: "/system/menu",
    method: "get",
    data,
  });
};
