import * as UrlConstant from "../utilities/UrlConstant";
import axiosClient from "./axiosClient";
import axiosClientAuthen from "./axiosClientAuthen";
/**
 *
 * TODO: modify url of GET_USER_SHIPPING_INFO: dont have to sent userID (/1)
 */
const UserApi = {
  login: async (params) => {
    let { email, pswd } = params;
    const url = `${UrlConstant.LOGIN}`;
    const data = JSON.stringify({ email, pswd });

    return axiosClient
      .post(url, data)

      .then((response) => {
        localStorage.setItem("access", response.role);
        localStorage.setItem("user", response.access_token);
        localStorage.setItem("fullname", response.fullname);
        // cookiesService.setCookies("access", response.role, 24);
        // cookiesService.setCookies("user", response.access_token, 24);
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  adminLogin: async (params) => {
    let { email, pswd } = params;
    const url = `${UrlConstant.ADMIN_LOGIN}`;
    const data = JSON.stringify({ email, pswd });

    return axiosClient
      .post(url, data)

      .then((response) => {
        localStorage.setItem("access", response.role);
        localStorage.setItem("user", response.access_token);
        localStorage.setItem("fullname", response.fullname);
        // cookiesService.setCookies("access", response.role, 24);
        // cookiesService.setCookies("user", response.access_token, 24);
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getShippingInfo: async () => {
    const url = `${UrlConstant.GET_USER_SHIPPING_INFO}`;
    return axiosClientAuthen
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  signup: (userInfo) => {
    const url = `${UrlConstant.SIGNUP}`;
    const data = JSON.stringify(userInfo);

    return axiosClientAuthen
      .post(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject(null);
        }
      });
  },
};
export default UserApi;
