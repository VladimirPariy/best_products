import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";

import {appUrl} from "lib/enums/app-urls";


const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={appUrl.home} element={<div></div>}/>
      <Route path={appUrl.favorites} element={<div></div>}/>
      <Route path={appUrl.categories} element={<div></div>}/>
    </Routes>
  );
};

export default AppRouter;