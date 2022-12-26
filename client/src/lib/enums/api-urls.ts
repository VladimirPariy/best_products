export const enum apiUrls {
  BASE_URL = "http://localhost:8000/api/",
  BASE_Image_URL = "http://localhost:8000/",

  sign_up = "auth/registration",
  sign_in = "auth/login",
  me = "auth/me",

  all_users = "user",
  one_user_by_id = "user/", // :id

  newTokenForUser = "user/token/", // :id ?????????????

  all_roles = "user/roles",
  role_by_user_id = "user/roles/", //:id

  all_categories = "categories",

  products = "products",
  one_product_by_id = "products/", // :id
}
