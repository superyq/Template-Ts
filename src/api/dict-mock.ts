import { result } from "@/mock/result.ts";
import {
  dictTable,
  dictTypeTable,
  dictDetail,
  dictTypeDetail,
} from "@/mock/dict.ts";

export const getDictTable = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(dictTable));
    }, 300);
    false && console.log(params);
  });
};

export const getDictDetail = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(dictDetail));
    }, 300);
    false && console.log(id);
  });
};

export const delDict = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result("删除成功"));
    }, 300);
    false && console.log(id);
  });
};

export const addOrUpdateDict = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(params);
      resolve(result(`新增成功`));
    }, 300);
  });
};

export const changeStatus = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(params);
      resolve(result(`修改成功`));
    }, 300);
  });
};

export const getDictTypeTable = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(dictTypeTable));
    }, 300);
    false && console.log(params);
  });
};

export const getDictTypeDetail = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result(dictTypeDetail));
    }, 300);
    false && console.log(id);
  });
};

export const delDictType = (id: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result("删除成功"));
    }, 300);
    false && console.log(id);
  });
};

export const addOrUpdateDictType = (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      false && console.log(params);
      resolve(result(`新增成功`));
    }, 300);
  });
};
