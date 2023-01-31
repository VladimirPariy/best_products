export const enum apiUrls {
  BASE_URL = "https://ancient-fjord-68876.herokuapp.com/api/",
  BASE_Image_URL = "https://ancient-fjord-68876.herokuapp.com/",
  sign_up = "auth/registration",
  sign_in = "auth/login",
  all_users = "user",
  one_user_by_id = "user/",
  newTokenForUser = "user/token/",
  all_roles = "user/roles",
  role_by_user_id = "user/roles/",
  all_categories = "categories",
  products = "products",
  one_product_by_id = "products/",
  temp_images = "products/temp/",
  prod_images = "products/img/",
  filtered_prod = "products/filter",
  parameters = "parameters/",
  characteristics = "characteristics/",
  search = "products/search",
  addComment = "comments",
  commentById = "comments/", //:id
  commentsByProductId = "comments/product/",
  priceHistoryByProductId = "history/",
  favorite = "favorite/",
  view = "view/",
  feedbacks = "feedbacks/",
  userStatistic = "statistics/users",
  popularStatistic = "statistics/views",
  favoritesStatistic = "statistics/favorites",
  commentedStatistic = "statistics/comments",
  ratingStatistic = "statistics/rating",
}
