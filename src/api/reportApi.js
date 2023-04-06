// import * as UrlConstant from "../utilities/UrlConstant";
// import axiosClientAuthen from "./axiosClientAuthen";
// import axiosClient from "./axiosClient";

const ReportApi = {
  getYearInformation: async (year) => {
    // const url = `${UrlConstant.GET_REVENUE}/${year}`;
    // return axiosClient.get(url);
    return {
      revenue: [100, 100, 400, 0, 230, 230, 405, 200, 0, 100, 90, 10],
      totalProducts: 54,
      totalInvoices: 40,
      totalRevenue: 40000000,
      highlightMonth: "June",
      highestRevenue: 5000000,
      totalCustomers: 50,
    };
  },
  getMonthDetail: async (month, year) => {
    // const url = `${UrlConstant.GET_REVENUE}/${year}`;
    // return axiosClient.get(url);
    return [
      {
        date: "2020-01-02",
        totalInvoices: 20,
        revenue: 400000000,
      },
      {
        date: "2020-01-02",
        totalInvoices: 20,
        revenue: 4000000,
      },
      {
        date: "2020-01-02",
        totalInvoices: 20,
        revenue: 4000000,
      },
      {
        date: "2020-01-02",
        totalInvoices: 20,
        revenue: 4000000,
      },
    ];
  },
};
export default ReportApi;
