import React, { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { getTokenFromStorage } from "lib/utils/token-from-storage";
import { JWT } from "lib/interfaces/jwt-decode.interface";
import { ICategory, ISubcategory } from "lib/interfaces/categories.interface";
import {
  selectCategories,
  selectSubcategories,
} from "store/categories/categories-selectors";
import { useAppSelector } from "lib/interfaces/store.types";

import ProtectedRoute from "components/router/protected-route/protected-route";

import Home from "pages/home/home";
import StatisticsPage from "pages/statistics-page";
import CategoryPage from "pages/category-page";
import UpdateProductPage from "pages/update-product-page";
import UsersControlPage from "pages/users-control-page";
import ProductLayout from "components/product-layout/product-layout";
import SubcategoryPage from "pages/subcategory-page";
import AdminPanel from "pages/admin-panel";
import AddNewProductPage from "pages/add-new-product-page";
import FavoritePage from "pages/favorite-page";
import ProductDetailPage from "pages/product-detail-page";
import NotFoundPage from "pages/not-found-page";

interface IAdminRoute {
  path: string;
  elem: JSX.Element;
}

const adminRoutes: IAdminRoute[] = [
  { path: "users", elem: <UsersControlPage /> },
  { path: "statistics", elem: <StatisticsPage /> },
  { path: "create", elem: <AddNewProductPage /> },
  { path: "update/:id", elem: <UpdateProductPage /> },
];

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

  const emptyRoute = <Route path="*" element={<NotFoundPage />} />;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/favorite/*"
        element={<ProductLayout isShowBreadcrumbs={false} />}
      >
        <Route index element={<FavoritePage />} />
        {emptyRoute}
      </Route>
      <Route path="/favorite/:id" element={<ProductDetailPage />} />
      <Route path="/admin/*" element={<ProtectedRoute isAllowed={isAllowed} />}>
        <Route index element={<AdminPanel />} />
        {adminRoutes.map((item) => (
          <Route path={item.path} element={item.elem} key={item.path} />
        ))}
        {emptyRoute}
      </Route>
      <Route
        path="/product/*"
        element={<ProductLayout isShowBreadcrumbs={true} />}
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
        {emptyRoute}
      </Route>
      <Route path="/product/:id" element={<ProductDetailPage />} />
      {emptyRoute}
    </Routes>
  );
};

export default AppRouter;
