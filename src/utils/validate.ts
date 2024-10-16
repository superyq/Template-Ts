// 外部网址
export const isExternal = (path: any): boolean =>
  /^(https?:|mailto:|tel)/.test(path);

// 字符串
export const isString = (str: any): boolean =>
  typeof str === "string" || str instanceof String;

// 数组
export const isArray = (arg: any): boolean => Array.isArray(arg);

// 对象
export const isObject = (val: any) => typeof val === "object" && val !== null;

// url
export const validURL = (url: any): boolean =>
  /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(
    url
  );

// 小写
export const validLowerCase = (str: any): boolean => /^[a-z]+$/.test(str);

// 大写
export const validUpperCase = (str: any): boolean => /^[A-Z]+$/.test(str);

// 字母
export const validAlphabets = (str: any): boolean => /^[a-zA-Z]+$/.test(str);

// 邮箱
export const validEmail = (str: any): boolean =>
  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);

// 手机
export const validPhone = (str: any): boolean =>
  /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/.test(str);
