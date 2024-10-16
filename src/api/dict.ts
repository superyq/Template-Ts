import request from "@/utils/request.ts";

export const getDictTable = (params: any) => {
  return request({
    url: "/dict/data/list",
    method: "get",
    data: params,
  });
};

export const getDictDetail = (id: any) => {
  return request({
    url: "/dict/data/detail",
    method: "get",
    data: {
      id,
    },
  });
};

export const delDict = (ids: any) => {
  return request({
    url: `/user/del`,
    method: "delete",
    params: {
      ids,
    },
  });
};

export const addOrUpdateDict = (params: any) => {
  let method = params.id ? "put" : "post";
  return request({
    url: `/dict`,
    method,
    params,
  });
};

export const getDictType = (params: string) => {
  return request({
    url: "/dict/type/list",
    method: "get",
    data: params,
  });
};

export const getDictTypeDetail = (id: any) => {
  return request({
    url: "/dict/type/detail",
    method: "get",
    data: {
      id,
    },
  });
};

export const delDictType = (ids: any) => {
  return request({
    url: `/dict/type`,
    method: "delete",
    params: {
      ids,
    },
  });
};

export const addOrUpdateDictType = (params: any) => {
  let method = params.id ? "put" : "post";
  return request({
    url: `/dict/type`,
    method,
    params,
  });
};
