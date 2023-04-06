import * as UrlConstant from "../utilities/UrlConstant";
import axiosClient from "./axiosClient";
import axiosClientAuthen from "./axiosClientAuthen";

const ProductApi = {
  getAllProducts: async (params) => {
    const url = `${UrlConstant.GET_ALL_PRODUCTS}`;
    return axiosClient.get(url);
  },
  remove: (id) => {
    const url = `${UrlConstant.REMOVE_PRODUCT}/${id}`;
    return axiosClient.delete(url);
  },
  getProductsByCategory: async (params) => {
    let { category } = params;
    const url = `${UrlConstant.GET_PRODUCTS_BY_CATEGORY}/category/${category}`;
    return axiosClient.get(url);
  },
  getTrendingProducts: async () => {
    const url = `${UrlConstant.GET_TRENDING_PRODUCTS}`;
    return axiosClient.get(url);
  },
  getTopPurchasedProducts: async (filterTopProduct) => {
    const url = `${UrlConstant.GET_TOP_PURCHASED_PRODUCTS}/${filterTopProduct}`;
    return axiosClient.get(url);
  },

  getDetailedProduct: async (id) => {
    const url = `${UrlConstant.GET_DETAILED_PRODUCT}/${id}`;
    return axiosClient.get(url);
  },
  getAdminDetailedProduct: async (id) => {
    const url = `${UrlConstant.GET_DETAILED_PRODUCT}/${id}`;
    return axiosClientAuthen.get(url);
  },
  getRelatedCategoryPro: async (id) => {
    const url = `${UrlConstant.GET_RELATED_CATEGORY_PRODUCT}/${id}`;
    return axiosClient.get(url);
  },
  getRelatedBrandPro: async (id) => {
    const url = `${UrlConstant.GET_RELATED_BRAND_PRODUCT}/${id}`;
    return axiosClient.get(url);
  },

  getSpecsPro: async (id) => {
    const url = `${UrlConstant.GET_SPECS_PRODUCT}/${id}`;
    return axiosClient.get(url);
  },
  getFullDescriptionPro: async (id) => {
    const url = `${UrlConstant.GET_FULL_DESCRIP_PRODUCT}/${id}`;
    return axiosClient.get(url);
  },
  searchProducts: async (info) => {
    const url = `${UrlConstant.SEARCH_PRODUCTS}?q=${info}`;
    return axiosClient.get(url);
  },
  searchProductsIncludeFilter: async (params) => {
    let { keyword, order } = params;
    const url = `${UrlConstant.SEARCH_PRODUCTS}?q=${keyword}&sortOrder=${order}`;
    return axiosClient.get(url);
  },
  getProposedProducts: async () => {
    const result = [
      {
        id: "1",
        img: "",
        name: "Apple Watch",
        images:
          "['images/headphone4.jpeg','images/headphone6.jpeg','images/headphone8.jpeg','images/headphone1.jpeg']",
        price: 10000000,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, tempore veniam ullam hic architecto maiores! Laborum accusamus reiciendis magni consectetur incidunt, suscipit, unde qui assumenda ratione voluptas, esse fugiat ipsam.",
        EXP: "2021-12-01 00:00:00",
      },
      {
        id: "2",
        img: "",
        name: "IPhone X",
        images:
          "['images/headphone1.jpeg','images/headphone6.jpeg','images/headphone8.jpeg','images/headphone1.jpeg']",
        price: 10000000,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, tempore veniam ullam hic architecto maiores! Laborum accusamus reiciendis magni consectetur incidunt, suscipit, unde qui assumenda ratione voluptas, esse fugiat ipsam.",
        EXP: "2021-12-02 00:00:00",
      },
      {
        id: "3",
        img: "",
        name: "IPhone XR",
        images:
          "['images/headphone2.jpeg','images/headphone6.jpeg','images/headphone8.jpeg','images/headphone1.jpeg']",
        price: 10000000,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, tempore veniam ullam hic architecto maiores! Laborum accusamus reiciendis magni consectetur incidunt, suscipit, unde qui assumenda ratione voluptas, esse fugiat ipsam.",
        EXP: "2021-12-23 00:00:00",
      },
      {
        id: "4",
        img: "",
        name: "IPhone 12",
        images:
          "['images/headphone3.jpeg','images/headphone6.jpeg','images/headphone8.jpeg','images/headphone1.jpeg']",
        price: 10000000,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, tempore veniam ullam hic architecto maiores! Laborum accusamus reiciendis magni consectetur incidunt, suscipit, unde qui assumenda ratione voluptas, esse fugiat ipsam.",
        EXP: "2021-12-01 00:00:00",
      },
      {
        id: "5",
        img: "",
        name: "Macbook Pro",
        images:
          "['images/headphone6.jpeg','images/headphone6.jpeg','images/headphone8.jpeg','images/headphone1.jpeg']",
        price: 10000000,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, tempore veniam ullam hic architecto maiores! Laborum accusamus reiciendis magni consectetur incidunt, suscipit, unde qui assumenda ratione voluptas, esse fugiat ipsam.",
        EXP: "2021-12-10 00:00:00",
      },
      {
        id: "6",
        img: "",
        name: "Macbook Air",
        images:
          "['images/headphone7.jpeg','images/headphone6.jpeg','images/headphone8.jpeg','images/headphone1.jpeg']",
        price: 10000000,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, tempore veniam ullam hic architecto maiores! Laborum accusamus reiciendis magni consectetur incidunt, suscipit, unde qui assumenda ratione voluptas, esse fugiat ipsam.",
        EXP: "2021-12-05 00:00:00",
      },
      {
        id: "7",
        img: "",
        name: "Airpod 2",
        images:
          "['images/headphone8.jpeg','images/headphone6.jpeg','images/headphone8.jpeg','images/headphone1.jpeg']",
        price: 10000000,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, tempore veniam ullam hic architecto maiores! Laborum accusamus reiciendis magni consectetur incidunt, suscipit, unde qui assumenda ratione voluptas, esse fugiat ipsam.",
        EXP: "2021-12-10 00:00:00",
      },
    ];
    return result;
  },

  getProductSpecificationAttribute: async (params) => {
    const url = `${UrlConstant.GET_EXISTED_SPECIFICATION}/${params.category}/${params.brand}`;
    return axiosClient.get(url);
  },
  updateProductInfo: async (product) => {
    const url = `${UrlConstant.UPDATE_PRODUCT}`;
    const body = JSON.stringify(product);

    return axiosClientAuthen
      .put(url, body)

      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  addProduct: async (product) => {
    const url = `${UrlConstant.ADD_NEW_PRODUCT}`;
    const body = JSON.stringify(product);
    return axiosClientAuthen
      .post(url, body)

      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => Promise.reject(error));
  },
  updateSpecsStatus: (id) => {
    const url = `${UrlConstant.UPDATE_SPECIFICATION_STATUS}/${id}`;

    return axiosClientAuthen
      .put(url)
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  getAffectProduct: (id) => {
    const url = `${UrlConstant.GET_AFFECTED_PRODUCTS}/${id}`;

    return axiosClient
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
  removeAttribute: (id) => {
    const url = `${UrlConstant.REMOVE_PRODUCT_ATTRIBUTE}/${id}`;

    return axiosClientAuthen
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => Promise.reject(error));
  },
};
export default ProductApi;
