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
} from "lib/store/categories/categories-selectors";
import { useAppSelector } from "lib/store/store-types";

import ProtectedRoute from "components/protected-route/protected-route";
import CategoryPage from "pages/products/categoriy-page/category-page";
import Home from "pages/home/home";
import ProductControl from "pages/admin/product-control/product-control";
import UpdateProduct from "pages/admin/update-product/update-product";
import UsersControl from "pages/admin/users-control/users-control";
import LayoutPage from "pages/products/layout-page/layout-page";
import SubcategoryPage from "pages/products/subcategory-page/subcategory-page";
import AdminPanel from "pages/admin/admin-panel/admin-panel";
import AddNewProduct from "pages/admin/add-new-product/add-new-product";

const AppRouter: FC = () => {
  const subcategories = useAppSelector(selectSubcategories);
  const [subcategoryRoutes, setSubcategoryRoutes] = useState<ISubcategory[]>(
    []
  );
  const category = useAppSelector(selectCategories);
  const [categoryRoutes, setCategoryRoutes] = useState<ICategory[]>([]);

  const token = getTokenFromStorage();
  const decode: JWT = token && jwtDecode(token);

  useEffect(() => {
    if (category) setCategoryRoutes(category);
    if (subcategories) setSubcategoryRoutes(subcategories);
  }, [subcategories, category]);

  const emptyRoute = <Route path="*" element={<div>Empty</div>} />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute
            isAllowed={
              !!token && typeof decode !== "string" && decode?.role === 1
            }
          />
        }
      >
        <Route index element={<AdminPanel />} />
        <Route path="users" element={<UsersControl />} />
        <Route path="products/*">
          <Route index element={<ProductControl />} />
          <Route path="create" element={<AddNewProduct />} />
          <Route path="update/:id" element={<UpdateProduct />} />
          {emptyRoute}
        </Route>
        {emptyRoute}
      </Route>
      <Route path="/product/*" element={<LayoutPage />}>
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
        {emptyRoute}
      </Route>
      {emptyRoute}
    </Routes>
  );
};

export default AppRouter;
