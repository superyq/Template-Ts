import axios from "axios";
import { getToken } from "@/utils/cookie.ts";
import { tansParams, blobValidate } from "@/utils/index.ts";
import errorCode from "@/utils/errorCode.ts";
import { useUserStore } from "@/store/user.ts";
import { saveAs } from "file-saver";

// 是否显示重新登录
export let isRelogin = { show: false };

// 请求和响应的消息主体用什么方式编码
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: import.meta.env.YQ_APP_BASE_API,
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use((config: any) => {
  // 是否需要 token，isToken 为 true 时不需要 token
  const isToken = (config.headers || {}).isToken === false;
  if (getToken() && !isToken) {
    // 让请求携带token
    config.headers["Authorization"] = "Bearer " + getToken();
  }
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  (res: any) => {
    const userStore = useUserStore();
    // 未设置返回码默认200
    let code = res.data.code || 200;
    // 获取错误信息
    let msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        window.$dialog.warning({
          title: "系统提示",
          content: "登录状态已过期，您可以继续留在该页面，或者重新登录",
          positiveText: "重新登录",
          negativeText: "取消",
          onPositiveClick: () => {
            isRelogin.show = false;
            userStore.logout().then(() => {
              location.href = "/";
            });
          },
          onNegativeClick: () => {
            isRelogin.show = false;
          },
        });
      }
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code !== 200) {
      return Promise.reject(msg);
    } else {
      return res.data;
    }
  },
  (err: any) => {
    let { message } = err;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = `系统接口${message.substr(message.length - 3)}异常`;
    }
    window.$msg.error(message);
    return Promise.reject(err);
  }
);

// 通用下载方法
export function download(
  url: string,
  params: any,
  filename: string,
  config?: Object
) {
  window.$load.start();
  return service
    .post(url, params, {
      transformRequest: [
        (params: any) => {
          return tansParams(params);
        },
      ],
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob",
      ...config,
    })
    .then(async (data: any) => {
      const isBlob = blobValidate(data);
      if (isBlob) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg =
          errorCode[rspObj.code] || rspObj.msg || errorCode["default"];
        window.$msg.error(errMsg);
      }
      window.$load.finish();
    })
    .catch(() => {
      window.$msg.error("下载文件出现错误，请联系管理员！");
      window.$load.finish();
    });
}

export default service;
