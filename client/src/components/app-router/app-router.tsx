import React, { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { getTokenFromStorage } from "lib/utils/token-from-storage";
import { JWT } from "lib/interfaces/jwt-decode.interface";
import {
  ICategory,
  ISubcategory,
} from "lib/interfaces/categories/categories.interface";
import {
  selectCategories,
  selectSubcategories,
} from "store/categories/categories-selectors";
import { useAppSelector } from "store/store-types";

import ProtectedRoute from "components/protected-route/protected-route";
import CategoryPage from "pages/products/categoriy-page/category-page";
import Home from "pages/home/home";
import ProductControl from "pages/admin/product-control/product-control";
import UpdateProduct from "pages/admin/update-product/update-product";
import UsersControlPage from "pages/admin/users-control/users-control-page";
import LayoutPage from "pages/products/layout-page/layout-page";
import SubcategoryPage from "pages/products/subcategory-page/subcategory-page";
import AdminPanel from "pages/admin/admin-panel/admin-panel";
import AddNewProduct from "pages/admin/add-new-product/add-new-product";
import FavoritePage from "pages/favorite/favorite-page";
import ProductDetailPage from "pages/product-details/product-detail-page";
const AppRouter: FC = () => {
  const subcategories = useAppSelector(selectSubcategories);
  const [subcategoryRoutes, setSubcategoryRoutes] = useState<ISubcategory[]>(
    []
  );
  const category = useAppSelector(selectCategories);
  const [categoryRoutes, setCategoryRoutes] = useState<ICategory[]>([]);

  const token = getTokenFromStorage();
  const decode: JWT = token && jwtDecode(token);
  const isAllowed = !!token && typeof decode !== "string" && decode?.role === 1;

  useEffect(() => {
    if (category) setCategoryRoutes(category);
    if (subcategories) setSubcategoryRoutes(subcategories);
  }, [subcategories, category]);

  const emptyRoute = <Route path="*" element={<div>Empty</div>} />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/favorite"
        element={<LayoutPage isShowBreadcrumbs={false} />}
      >
        <Route index element={<FavoritePage />} />
        <Route path=":id" element={<ProductDetailPage />} />
      </Route>
      <Route path="/admin/*" element={<ProtectedRoute isAllowed={isAllowed} />}>
        <Route index element={<AdminPanel />} />
        <Route path="users" element={<UsersControlPage />} />
        <Route path="products/*">
          <Route index element={<ProductControl />} />
          <Route path="create" element={<AddNewProduct />} />
          <Route path="update/:id" element={<UpdateProduct />} />
          {emptyRoute}
        </Route>
        {emptyRoute}
      </Route>
      <Route
        path="/product/*"
        element={<LayoutPage isShowBreadcrumbs={true} />}
      >
        {categoryRoutes.map((categoryRoute) => (
          <Route
            path={`${categoryRoute.category_title}/*`}
            key={categoryRoute.category_id}
          >
            <Route index element={<CategoryPage />} />
            {subcategoryRoutes
              .filter(
                (subcategoryRoute) =>
                  subcategoryRoute.category === categoryRoute.category_id
              )
              .map((subcategory) => (
                <Route
                  path={subcategory.subcategory_title}
                  element={<SubcategoryPage />}
                  key={subcategory.subcategory_id}
                />
              ))}
            {emptyRoute}
          </Route>
        ))}
      </Route>
      <Route path="/product/:id" element={<ProductDetailPage />} />
      {emptyRoute}
    </Routes>
  );
};

export default AppRouter;
