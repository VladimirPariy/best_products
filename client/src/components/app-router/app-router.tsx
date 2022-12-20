import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";

import AdminPanel from "pages/admin-panel/admin-panel";
import AddNewProduct from "pages/add-new-product/add-new-product";

import {appUrl} from "lib/enums/app-urls";


const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={appUrl.home} element={<div></div>}/>
      <Route path={appUrl.favorites} element={<div></div>}/>
      <Route path={appUrl.categories} element={<div></div>}/>
      <Route path={appUrl.admin_panel} element={<AdminPanel/>}/>
      <Route path={appUrl.new_product} element={<AddNewProduct/>}/>
    </Routes>
  );
};

export default AppRouter;
