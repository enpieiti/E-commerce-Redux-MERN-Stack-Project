export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/users/register",
    LOGIN: "/api/users/login",
    GET_PROFILE: "/api/users/profile",
  },
  PRODUCT: {
    CREATE: "/api/products",
    UPDATE: (id) => `/api/products/${id}`,
    DELETE: (id) => `/api/products/${id}`,
    GET_ALL: (query) => `/api/products?${query}`,
    GET_BEST_SELLER: "/api/products/best-seller",
    GET_NEW_ARRIVALS: "/api/products/new-arrivals",
    GET_BY_ID: (id) => `/api/products/${id}`,
    GET_SIMILAR: (id) => `/api/products/similar/${id}`,
  },
  PRODUCT_ADMIN: {
    GET_ALL: "/api/admin/products",
  },
  CART: {
    ADD: "/api/cart",
    UPDATE: "/api/cart",
    DELETE: "/api/cart",
    GET: "/api/cart",
    MERGE: "/api/cart/merge",
  },
  CHECKOUT: {
    CREATE: "/api/checkout",
    MARK_AS_PAID: (id) => `/api/checkout/${id}/pay`,
    FINALIZE: (id) => `/api/checkout/${id}/finalize`,
  },
  ORDER: {
    GET_MY_ORDERS: "/api/orders/my-orders",
    GET_BY_ID: (id) => `/api/orders/${id}`,
  },
  ORDER_ADMIN: {
    GET_ALL: "/api/admin/orders",
    UPDATE: (id) => `/api/admin/orders/${id}`,
    DELETE: (id) => `/api/admin/orders/${id}`,
  },
  USER_ADMIN: {
    GET_ALL: "/api/admin/users",
    CREATE: "/api/admin/users",
    UPDATE: (id) => `/api/admin/users/${id}`,
    DELETE: (id) => `/api/admin/users/${id}`,
  },
  UPLOAD: {
    UPLOAD_IMAGE: "/api/upload/image",
  },
  SUBSCRIBE: {
    SUBSCRIBE: "/api/subscribe",
  },
};
