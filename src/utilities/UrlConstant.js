// PRODUCT
export const GET_PRODUCTS_BY_CATEGORY = "/api/v1/product";
export const REMOVE_PRODUCT = "/api/v1/product";
export const GET_ALL_PRODUCTS = "/api/v1/product";
export const GET_TRENDING_PRODUCTS = "api/v1/product/trending";
export const GET_TOP_PURCHASED_PRODUCTS = "api/v1/product/toppurchased";
export const GET_DETAILED_PRODUCT = "/api/v1/product";
export const GET_RELATED_CATEGORY_PRODUCT = "/api/v1/product/related-category";
export const GET_RELATED_BRAND_PRODUCT = "/api/v1/product/related-brand";
export const GET_SPECS_PRODUCT = "/api/v1/product/specs";
export const GET_FULL_DESCRIP_PRODUCT = "/api/v1/product/longDescrip";
export const GET_EXISTED_SPECIFICATION = "/api/v1/product/specification";
export const UPDATE_SPECIFICATION_STATUS = "/api/v1/product/specification";
export const GET_AFFECTED_PRODUCTS =
  "/api/v1/product/specification/affected-product";
export const REMOVE_PRODUCT_ATTRIBUTE = "/api/v1/product/specification";

export const SEARCH_PRODUCTS = "/api/v1/product";
export const ADD_NEW_PRODUCT = "/api/v1/product";
export const UPDATE_PRODUCT = "/api/v1/product";

export const GET_PROPOSED_PRODUCTS = "/proposed_products";
export const GET_PRODUCTS_IN_CART = "/products";

// CATEGORY
export const GET_ALL_CATEGORIES = "/api/v1/category";
export const REMOVE_CATEGORY = "/api/v1/category";
export const UPDATE_CATEGORY = "/api/v1/category";
export const ADD_CATEGORY = "/api/v1/category";

// BRANDS
export const GET_ALL_BRANDS = "/api/v1/brand";
export const REMOVE_BRANDS = "/api/v1/brand";
export const UPDATE_BRANDS = "/api/v1/brand";
export const ADD_BRANDS = "/api/v1/brand";

// REVIEW
export const GET_ALL_REVIEWS_BY_PRODUCTID = "/api/v1/review";
export const ADD_REVIEW = "/api/v1/review";

// COUPON
export const GET_COUPON_BY_ID = "/coupons";

// USER
export const LOGIN = "api/v1/auth/login";
export const ADMIN_LOGIN = "api/v1/auth/admin/login";
export const GET_USER_SHIPPING_INFO = "/api/v1/user/shippingInfo";
export const SIGNUP = "/api/v1/user";
export const PLACE_ORDER = "/api/v1/invoice";

// ORDER
export const GET_ALL_USER_ORDERS = "/api/v1/invoice/user";
export const GET_ALL_ADMIN_ORDERS = "/api/v1/invoice";
export const GET_DETAILED_ORDER = "/api/v1/invoice";
export const CANCEL_ORDER = "/api/v1/invoice/cancel";
export const UPDATE_ORDER_STATUS = "/api/v1/invoice/status";
export const TRANSFER_TO_SHIPPER = "/api/v1/invoice/shipper";
export const GET_ALL_ORDER = "/api/v1/invoice";

// TOKEN
export const REFRESH_TOKEN = "/refresh";

// SHIPPER
export const GET_ALL_SHIPPERS = "/api/v1/shipper";

// CUSTOMER
export const GET_ALL_CUSTOMERS = "/api/v1/customer";
export const GET_DETAILED_CUSTOMERS = "/api/v1/customer";

// REPORT
export const GET_REVENUE = "/api/v1/revenue";
