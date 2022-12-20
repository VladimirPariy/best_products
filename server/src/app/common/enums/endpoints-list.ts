export const enum EndpointsList {
  //index
  API = '/api',
  //root-router
  ROOT_AUTH = "/auth",
  ROOT_USER = "/user",
  ROOT_CATEGORIES = "/categories",
  ROOT_PRODUCTS = "/products",
  //auth-router
  SIGN_UP = "/registration",
  SIGN_IN = "/login",
  CHECK_AUTH = "/auth",
  //user-router
  ALL_USERS = "/all",
  ONE_USER_BY_ID = "/:id",
  UPDATE_TOKEN = "/token/:id",

  //categories
  GET_ALL_CATEGORIES = "/all",

  //products
  CREATE_PRODUCT = "/create",

}