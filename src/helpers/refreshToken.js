import axiosClient from "../api/axiosClient";
import { cookiesService } from "../helpers/cookiesService";
import * as UrlConstant from "../utilities/UrlConstant";

export async function refreshToken(refreshTokenRequest) {
  const url = `${UrlConstant.REFRESH_TOKEN}`;
  const refresh_token = cookiesService.getRefreshToken();
  const data = JSON.stringify({ refresh_token });
  return axiosClient
    .post(url, data)
    .then((response) => {
      cookiesService.updateAccessToken(response);
    })
    .catch((error) => {
      cookiesService.removeCookies("user");
      window.location.href = "/login";
      return Promise.reject(error);
    });
}
