import { result } from "@/mock/result.ts";
import { tableData, detailData } from "@/mock/menu.ts";

// 列表数据
export const getMenuTable = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(tableData));
    }, 300);
    false && console.log(params);
  });
};

// menu 详情
export const menuInfo = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(detailData));
    }, 300);
    false && console.log(id);
  });
};

// 新增/修改 menu
export const addOrUpdateMenu = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(params);
      resolve(result(`新增成功`));
    }, 300);
  });
};

// 删除 menu
export const delMenu = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(id));
    }, 300);
  });
};

// 修改状态
export const changeStatus = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result("修改成功"));
    }, 300);
    false && console.log(data);
  });
};
