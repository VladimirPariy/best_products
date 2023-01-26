export const enum EndpointsList {
  //index
  API = "/api",

  //root-router
  ROOT_AUTH = "/auth",
  ROOT_USER = "/user",
  ROOT_CATEGORIES = "/categories",
  ROOT_PRODUCTS = "/products",
  ROOT_PARAMETERS = "/parameters",
  ROOT_COMMENTS = "/comments",
  ROOT_PRICE_HISTORY = "/history",
  ROOT_FAVORITE_PRODUCTS = "/favorite",
  ROOT_CHARACTERISTICS = "/characteristics",
  ROOT_VIEW = "/view",
  ROOT_FEEDBACK = "/feedbacks",
  ROOT_STATISTICS = "/statistics",

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
  CATEGORIES_WITH_SUBCATEGORIES = "/",
  SUBCATEGORIES = "/subcategories",
  CATEGORIES = "/categories",

  //products
  PRODUCTS = "/",
  FILTERED_PRODUCTS = "/filter",
  ONE_PRODUCT_BY_ID = "/:id",
  TEMP_IMAGES = "/temp",
  REMOVE_TEMP_IMAGES = "/temp/:id",
  REMOVE_IMAGE = "/img/:id",

  //parameters
  PARAMETERS = "/",
  PARAMETERS_BY_SUBCATEGORY_ID = "/:subcategoryId",

  //search
  SEARCH = "/search",

  //comments
  COMMENTS = "/",
  COMMENT_BY_ID = "/:id",
  COMMENTS_BY_PRODUCT_ID = "/product/:id",

  //price-history
  PRICE_HISTORY_BY_PRODUCT_ID = "/:id",

  //favorite products
  FAVORITE_PRODUCTS = "/",
  FAVORITE_PRODUCTS_BY_USER_ID = "/:id",

  //characteristics
  CHARACTERISTICS = "/",

  //view
  VIEW = "/",

  //feedbacks
  FEEDBACK = "/",
  FEEDBACKS_BY_USER_ID = "/:id",

  //statistics
  NEW_USERS = "/users",
  MOST_VIEWS = "/views",
  MOST_FAVORITES = "/favorites",
  MOST_COMMENTED = "/comments",
  HIGHEST_AVERAGE_RATING = "/rating",
}
