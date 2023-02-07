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

interface IRoute {
  path?: string;
  index?: boolean;
  elem: JSX.Element;
}

interface ISubcategoryRoute extends IRoute {
  category: number;
}

interface ICategoryRoute {
  path: string;
  children?: Partial<ISubcategoryRoute>[];
  elem?: JSX.Element;
}

const adminRoutes: IRoute[] = [
  { index: true, elem: <AdminPanel /> },
  { path: "users", elem: <UsersControlPage /> },
  { path: "statistics", elem: <StatisticsPage /> },
  { path: "create", elem: <AddNewProductPage /> },
  { path: "update/:id", elem: <UpdateProductPage /> },
  { path: "*", elem: <NotFoundPage /> },
];

const favoriteRoutes: IRoute[] = [
  { index: true, elem: <FavoritePage /> },
  { path: "*", elem: <NotFoundPage /> },
];

const AppRouter: FC = () => {
  const subcategoriesFromServer = useAppSelector(selectSubcategories);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const categoriesFromServer = useAppSelector(selectCategories);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const token = getTokenFromStorage();
  const decode: JWT = token && jwtDecode(token);
  const isAllowed = !!token && typeof decode !== "string" && decode?.role === 1;

  useEffect(() => {
    if (categoriesFromServer) setCategories(categoriesFromServer);
    if (subcategoriesFromServer) setSubcategories(subcategoriesFromServer);
  }, [subcategoriesFromServer, categoriesFromServer]);

  const [subcategoriesRoutes, setSubcategoriesRoutes] = useState<
    ISubcategoryRoute[]
  >([]);

  useEffect(() => {
    if (subcategories.length)
      setSubcategoriesRoutes(
        subcategories.map((item) => ({
          path: item.subcategory_title,
          elem: <SubcategoryPage />,
          category: item.category,
        }))
      );
  }, [subcategories]);

  const [categoriesRoutes, setCategoriesRoutes] = useState<ICategoryRoute[]>(
    []
  );

  useEffect(() => {
    if (categories.length && subcategoriesRoutes.length)
      setCategoriesRoutes([
        ...categories.map((item) => ({
          path: `${item.category_title}/*`,
          children: [
            { index: true, elem: <CategoryPage /> },
            ...subcategoriesRoutes.filter(
              (sub) => sub.category === item.category_id
            ),
            { path: "*", elem: <NotFoundPage /> },
          ],
        })),
        { path: "*", elem: <NotFoundPage /> },
      ]);
  }, [categories, subcategoriesRoutes]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/favorite/*"
        element={<ProductLayout isShowBreadcrumbs={false} />}
      >
        {favoriteRoutes.map((item, index) => (
          <Route
            index={item.index}
            element={item.elem}
            path={item.path}
            key={index}
          />
        ))}
      </Route>
      <Route path="/favorite/:id" element={<ProductDetailPage />} />
      <Route path="/admin/*" element={<ProtectedRoute isAllowed={isAllowed} />}>
        {adminRoutes.map((item, index) => (
          <Route
            index={item.index}
            element={item.elem}
            path={item.path}
            key={index}
          />
        ))}
      </Route>
      <Route
        path="/product/*"
        element={<ProductLayout isShowBreadcrumbs={true} />}
      >
        {categoriesRoutes.map((item, i) => {
          if (!item.children) {
            return <Route path={item.path} element={item.elem} key={i} />;
          }
          return (
            <Route path={item.path} key={item.path}>
              {item.children?.map((child, index) => (
                <Route
                  path={child.path}
                  index={child.index}
                  element={child.elem}
                  key={index}
                />
              ))}
            </Route>
          );
        })}
      </Route>
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
