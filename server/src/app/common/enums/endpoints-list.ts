export const enum EndpointsList {
  //index
  API = "/api",
  //root-router
  ROOT_AUTH = "/auth",
  ROOT_USER = "/user",
  ROOT_CATEGORIES = "/categories",
  ROOT_PRODUCTS = "/products",
  //auth-router
  SIGN_UP = "/registration",
  SIGN_IN = "/login",
  ME = "/me", //????????????????
  //user-router
  ALL_USERS = "/",
  ONE_USER_BY_ID = "/:id",
  TOKEN_BY_USER_ID = "/token/:id", // ?????
  ROLE_LIST = "/roles",
  ROLE_BY_USER_ID = "/roles/:id",

  //categories
  CATEGORIES = "/",

  //products
  PRODUCTS = "/",
  ONE_PRODUCT_BY_ID = "/:id",
  TEMP_IMAGES = "/temp",
  REMOVE_TEMP_IMAGES = "/temp/:id",
  REMOVE_IMAGE = "/img/:id",
}
