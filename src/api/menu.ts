import request from "@/utils/request.ts";

// 列表数据
export const getMenuTable = (params: any) => {
  return request({
    url: "/system/menu",
    method: "get",
    params,
  });
};

// menu 详情
export const menuInfo = (id: any) => {
  return request({
    url: "/system/menu",
    method: "get",
    params: {
      id,
    },
  });
};

// 新增/修改 menu
export const addOrUpdateMenu = (params: any) => {
  let method = params.menuId ? "put" : "post";
  return request({
    url: `/menu/status`,
    method,
    params,
  });
};

// 删除 menu
export const delMenu = (id: any) => {
  return request({
    url: "/system/menu",
    method: "delete",
    data: {
      id,
    },
  });
};

// 修改状态
export const changeStatus = (data: any) => {
  return request({
    url: "",
    method: "post",
    data,
  });
};
