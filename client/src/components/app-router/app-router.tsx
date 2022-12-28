import ProductControl from "pages/product-control/product-control";
import UpdateProduct from "pages/update-product/update-product";
import UsersControl from "pages/users-control/users-control";
import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import AdminPanel from "pages/admin-panel/admin-panel";
import AddNewProduct from "pages/add-new-product/add-new-product";

import { appUrl } from "lib/enums/app-urls";

interface IRoutes {
  path: string;
  elem: JSX.Element;
}

const routes: IRoutes[] = [
  { elem: <div></div>, path: appUrl.home },
  { elem: <div></div>, path: appUrl.favorites },
  { elem: <div></div>, path: appUrl.categories },
  { elem: <AdminPanel />, path: appUrl.admin_panel },
  { elem: <ProductControl />, path: appUrl.products },
  { elem: <AddNewProduct />, path: appUrl.new_product },
  { elem: <UsersControl />, path: appUrl.users_table },
  { elem: <UpdateProduct />, path: appUrl.update_product },
];

const AppRouter: FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.elem} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
