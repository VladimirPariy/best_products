export enum ApiUrls {
  BASE_URL = "http://localhost:8000/api/",
  BASE_Image_URL = "http://localhost:8000/",

  registration = "auth/registration/",
  login = "auth/login/",
  newTokenForUser = "user/token/:id",
  auth = "auth/auth/",

  oneUserById = "user/",
  allUsers = "user/all",
  allRoles = "user/roles",

  allCategories = "categories/all/",
  subcategoriesOfCategory = "subcategories/category/",

  createProduct = "products/create"
}
