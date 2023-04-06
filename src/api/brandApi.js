import * as UrlConstant from "../utilities/UrlConstant";
import axiosClient from "./axiosClient";
import axiosClientAuthen from './axiosClientAuthen';

const BrandApi = {
  getBrands: async () => {
    const url = `${UrlConstant.GET_ALL_BRANDS}`;
    return axiosClient.get(url);
  },
  remove: (id) => {
    const url = `${UrlConstant.REMOVE_BRANDS}/${id}`;
    return axiosClientAuthen.delete(url);
  },
  update: async (brand) => {
    const url = `${UrlConstant.UPDATE_BRANDS}`;
    const body = JSON.stringify(brand);
    return  axiosClientAuthen
      .put(url, body)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  add: async (brand) => {
    const url = `${UrlConstant.ADD_BRANDS}`;
    const body = JSON.stringify(brand);
    return  axiosClientAuthen
      .post(url, body)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
};
export default BrandApi;
