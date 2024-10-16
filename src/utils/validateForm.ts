import { validPhone, validEmail } from "@/utils/validate.ts";

export const validatePhone = (rule: any, value: string) => {
  false && console.log(rule);
  if (!value) {
    return new Error("请输入手机号");
  } else if (!validPhone(value)) {
    return new Error("请正确输入手机号");
  }
};

export const validateEmail = (rule: any, value: string) => {
  false && console.log(rule);
  if (value && !validEmail(value)) {
    return new Error("请正确输入邮箱号");
  }
};
