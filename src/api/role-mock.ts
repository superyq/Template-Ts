import { result } from "@/mock/result.ts";
import { roleTable, roleDetail } from "@/mock/role.ts";

export const getRoleTable = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(roleTable));
    }, 300);
  });
  false && console.log(params);
};

export const getRoleDetail = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(roleDetail));
    }, 300);
  });
  false && console.log(id);
}

export const addOrUpdateRole = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(params);
      resolve(result(`新增成功`));
    }, 300);
  });
};

export const delRole = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(id));
    }, 300);
  });
};

export const changeStatus = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result("修改成功"));
    }, 300);
    false && console.log(data);
  });
};
