import { defineStore } from "pinia";
import { login, logout } from "@/api/login-mock.ts";
import { getUserInfo } from "@/api/user-mock.ts";
import { ILoginPramas } from "@/model/login.ts";
import { removeToken, setToken, getToken } from "@/utils/cookie.ts";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: getToken() || null,
      user: {
        userName: "",
        realName: "",
        phoneNumber: "",
        email: "",
        avatar: "",
      },
      roles: [],
      permissions: [],
    };
  },
  actions: {
    login(data: ILoginPramas) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            if (res.code !== 200) {
              return reject(res);
            }
            const token = res.data.token;
            setToken(token);
            this.token = token;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            if (res.code !== 200) {
              reject(res);
            }
            removeToken();
            this.token = "";
            this.roles = [];
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res: any) => {
            if (res.code !== 200) {
              return reject(res);
            }
            const { data } = res;
            this.roles = data.roles;
            this.user = data;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
