import { classifyOrder } from "../helpers/classifyOrder";
import * as UrlConstant from "../utilities/UrlConstant";
import axiosClient from "./axiosClient";

const CustomerApi = {
  getAllCustomers: () => {
    const url = `${UrlConstant.GET_ALL_CUSTOMERS}`;
    return axiosClient
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getCustomerInfo: (id) => {
    const url = `${UrlConstant.GET_DETAILED_CUSTOMERS}/${id}`;
    return axiosClient
      .get(url)
      .then((response) => {
        const customer = { ...response };
        customer.orders = classifyOrder(customer.orders);
        return customer;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};
export default CustomerApi;
