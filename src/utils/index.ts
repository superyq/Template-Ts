import { IOptions } from "@/model/common.ts";
import { isObject } from "@/utils/validate.ts";

// 判断两个数据是否相同
export const equals = (val1: any, val2: any) => {
  if (!isObject(val1) || !isObject(val2)) return Object.is(val1, val2);
  if (val1 === val2) return true;

  const val1Keys = Object.keys(val1);
  const val2Keys = Object.keys(val2);
  if (val1Keys.length !== val2Keys.length) return false;
  for (const key of val1Keys) {
    if (!val2Keys.includes(key)) {
      return false;
    }
    const res = equals(val1[key], val2[key]);
    if (!res) return false;
  }
  return true;
};

// 数组去重
export const deduplication = (arr: any) => {
  const newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
      if (equals(newArr[i], newArr[j])) {
        newArr.splice(j, 1);
        j--;
      }
    }
  }
  return newArr;
};

// 数组按 param 属性从小到大排序
export const sortArr = (arr: any, param: string) => {
  const newArr = [...arr];

  newArr.sort((a, b) => a[param] - b[param]);
  return newArr;
};

export const uploadFileChunk = (file: File) => {
  const chunkSize = 1024 * 1024; // 每个部分的大小（1MB）
  const totalChunks: any = Math.ceil(file.size / chunkSize); // 总部分数

  let currentChunk: any = 1;
  let startByte = 0;

  while (startByte < file.size) {
    // 分割文件为多个部分，并上传每个部分
    const endByte = Math.min(startByte + chunkSize, file.size);
    const chunk = file.slice(startByte, endByte);

    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("fileName", file.name);
    formData.append("chunkNumber", currentChunk);
    formData.append("totalChunks", totalChunks);

    console.log(
      "formData",
      formData.getAll("fileName"),
      formData.getAll("chunkNumber"),
      formData.getAll("file")
    );
    startByte += chunkSize;
    currentChunk++;
  }
};

// 大文件切片
export const createFileChunk = (file: File, size = 100) => {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({
      file: file.slice(cur, cur + size),
    });
    cur += size;
  }
  return fileChunkList;
};

// 图片转 base64
export const toBase64 = (file: File): any => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result); // base64
    };
    reader.onerror = function (err) {
      console.log(err);
      reject(err);
    };
  });
};

// 时间格式化成 Date
export const toDate = (time: string | number | Date): Date => {
  // time 转 Date 格式
  let date: Date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time
        .replace(/-/gm, "/")
        .replace("T", "")
        .replace(/\.[\d]{3}/gm, "");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  return date;
};

// 日期格式化
export const parseTime = (
  time: string | number | Date,
  pattern?: string
): string | null => {
  if (!time) {
    return null;
  }

  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";

  const date: Date = toDate(time);
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result, key: string): string => {
      // 无效判断
      if (result.length == 0) {
        console.log("日期格式化失败");
      }
      let value = formatObj[key];
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      return value.toString().padStart(2, "0");
    }
  );
  return time_str;
};

// 距离当前时间多久
export const dTime = (
  time: string | number | Date,
  pattern?: string
): string | null => {
  const _time = +toDate(time);
  const _now = Date.now();
  const _diff = (_now - _time) / 1000;

  if (_diff < 30) {
    return "刚刚";
  } else if (_diff < 3600) {
    return `${Math.ceil(_diff / 60)}分钟前`;
  } else if (_diff < 3600 * 24) {
    return `${Math.ceil(_diff / 3600)}小时前`;
  } else if (_diff < 3600 * 24 * 2) {
    return "1天前";
  }

  return parseTime(time, pattern);
};

// 添加日期范围
export const addDateRange = (
  params: { [key: string]: any },
  dateRange: string[],
  propName = "Time"
) => {
  let search = params;
  search.params =
    typeof search.params === "object" &&
    search.params !== null &&
    !Array.isArray(search.params)
      ? search.params
      : {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];

  search.params[`begin${propName}`] = dateRange[0];
  search.params[`end${propName}`] = dateRange[1];

  return search;
};

// 构造树形结构
export const toTreeData = (
  arr: IOptions[],
  rootValue: string | number
): { [key: string]: any }[] => {
  const _arr: any[] = [];
  arr.forEach((item) => {
    if (item.parentId === rootValue) {
      const children = toTreeData(arr, item.menuId);
      if (children.length > 0) {
        item.children = children;
      }
      _arr.push(item);
    }
  });
  return _arr;
};

// 验证是否为blob格式
export function blobValidate(data: any) {
  return data.type !== "application/json";
}

// 参数处理
export const tansParams = (params: { [key: string]: any }): string => {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
};

// 深拷贝
export const deepClone = (obj: any) => {
  // 判断是否为对象或数组
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 判断是否为日期类型
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 判断是否为正则表达式类型
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // 判断是否为函数类型
  if (typeof obj === "function") {
    return new Function("return " + obj.toString())();
  }

  // 处理对象和数组类型
  const newObj: any = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // 判断是否为自身属性
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }

  return newObj;
};

// 防抖
export const debounce = (fn: Function, wait: number = 500): Function => {
  let timer: any = null;
  return function () {
    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
};

// 节流
export const throttle = (fn: Function, wait: number = 1000): Function => {
  let timer: any = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, wait);
    }
  };
};

/**
 * 下载函数
 * @param {string} data - 后端获取的文件流
 * @param {string} name - 文件名
 */
export const downloadFile = (data: any, name: string = "a") => {
  const blob = new Blob([data]);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.style.display = "none";
  a.click();
  document.body.removeChild(a);
};
