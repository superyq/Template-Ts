import request from "@/utils/request.ts";

export const toFormData = (file: any) => {
  // 构建 form 表单;
  let formData = new FormData();
  formData.append("file", file);
  return formData;
};

// 上传头像
export const updateAvatar = (data: any) => {
  let formData = toFormData(data);
  return request({
    url: "/users/avatar",
    method: "post",
    // 设置请求头(重点)
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};

// 上传用户列表
export const uploadUser = (data: any) => {
  let formData = toFormData(data);
  return request({
    url: "/users/list",
    method: "post",
    // 设置请求头(重点)
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
};
