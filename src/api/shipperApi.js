import * as UrlConstant from "../utilities/UrlConstant";
import axiosClientAuthen from "./axiosClientAuthen";

const ShipperApi = {
  getAllShippers: () => {
    const url = `${UrlConstant.GET_ALL_SHIPPERS}`;
    return axiosClientAuthen.get(url);
  }
};
export default ShipperApi;
