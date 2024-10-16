import request from "@/utils/request.ts";

// 登录用户信息
export const getUserInfo = () => {
  return request({
    url: "/users/userinfo",
    method: "get",
  });
};

// 更新登录用户信息
export const updateUserinfo = (data: any) => {
  return request({
    url: "/users/userinfo",
    method: "post",
    data,
  });
};

// 更新登录用户头像
export const updateAvatar = (data: any) => {
  return request({
    url: "/users/avatar",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};

// 修改登录用户密码
export const updateUserPwd = (data: any) => {
  return request({
    url: "/users/updatePassword",
    method: "post",
    data,
  });
};

// 动态路由
export const getRouters = () => {
  return request({
    url: "/getRouters",
    method: "get",
  });
};

// 用户列表
export const getUserTable = (params: any) => {
  return request({
    url: "/userList",
    method: "get",
    params,
  });
};

// 修改用户状态
export const changeStatus = (params: any) => {
  return request({
    url: "/user/status",
    method: "post",
    params,
  });
};

// 获取用户详情
export const getUserDetail = (id: any) => {
  return request({
    url: `/user/status/${id}`,
    method: "get",
  });
};

// 新增/修改 用户
export const addOrUpdateUser = (params: any) => {
  let method = params.id ? "put" : "post";
  return request({
    url: `/user/status`,
    method,
    params,
  });
};

// 删除用户
export const delUser = (ids: any) => {
  return request({
    url: `/user/del`,
    method: "delete",
    params: {
      ids,
    },
  });
};

// 重置密码
export const resetPwd = (params: any) => {
  return request({
    url: `/user/reset`,
    method: "put",
    params,
  });
};
