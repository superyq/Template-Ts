import { result } from "@/mock/result.ts";
import { tableData } from "@/mock/menu.ts";
import { userInfo, userTable, userDetail } from "@/mock/user.ts";

// 登录用户信息
export const getUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(userInfo));
    }, 300);
  });
};

// 更新登录用户信息
export const updateUserinfo = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result("更新成功"));
    }, 300);
  });
  false && console.log(data);
};

// 更新登录用户头像
export const updateAvatar = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result("更新成功"));
    }, 300);
  });
  false && console.log(data);
};

// 修改登录用户密码
export const updateUserPwd = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result("修改成功"));
    }, 300);
  });
  false && console.log(data);
};

// 动态路由
export const getRouters = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(tableData));
    }, 300);
  });
};

// 用户列表
export const getUserTable = (params: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result(userTable));
    }, 300);
    false && reject(params);
  });
};

// 修改用户状态
export const changeStatus = (params: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result("修改成功"));
    }, 300);
    false && reject(params);
  });
};

// 获取用户详情
export const getUserDetail = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(userDetail));
    }, 300);
    false && console.log("params", id);
  });
};

// 新增/修改 用户
export const addOrUpdateUser = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(params);
      resolve(result(`新增成功`));
    }, 300);
  });
};

// 删除用户
export const delUser = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(id);
      resolve(result(`删除成功`));
    }, 300);
  });
};

// 重置密码
export const resetPwd = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(params);
      resolve(result(`修改成功`));
    }, 300);
  });
};
