import * as UrlConstant from "../utilities/UrlConstant";
import axiosClient from "./axiosClient";
import axiosClientAuthen from "./axiosClientAuthen";
// import axiosClientAuthen from './axiosClientAuthen';

const CategoryApi = {
  getAll: async () => {
    const url = `${UrlConstant.GET_ALL_CATEGORIES}`;
    return axiosClient.get(url);
  },
  remove: async (id) => {
    const url = `${UrlConstant.REMOVE_CATEGORY}/${id}`;
    return  axiosClientAuthen
    .delete(url)

    .then((response) => {
      return response;
    })
    .catch((error) => Promise.reject(error));
  },
  update: async (category) => {
    const url = `${UrlConstant.UPDATE_CATEGORY}`;
    const body = JSON.stringify(category);
    return  axiosClientAuthen
      .put(url, body)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  add: async (category) => {
    const url = `${UrlConstant.ADD_CATEGORY}`;
    const body = JSON.stringify(category);
    return  axiosClientAuthen
      .post(url, body)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
};
export default CategoryApi;
