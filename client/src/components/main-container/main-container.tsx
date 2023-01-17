import React, { FC, useEffect } from "react";

import styles from "components/main-container/main-container.module.scss";

import AppRouter from "components/app-router/app-router";
import AdminPanelLink from "components/ui/admin-panel-link/admin-panel-link";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import { useAppDispatch, useAppSelector } from "store/store-types";
import { userInfoTrigger } from "store/user/user-actions";
import { selectAuth, selectUser } from "store/user/user-selector";
import { getTokenFromStorage } from "lib/utils/token-from-storage";

const MainContainer: FC = () => {
  const dispatch = useAppDispatch();
  const token = getTokenFromStorage();
  const auth = useAppSelector(selectAuth);
  const { users_roles } = useAppSelector(selectUser);
  let role_title;
  if (users_roles) {
    role_title = users_roles.role_title;
  }

  useEffect(() => {
    if (token && !auth) {
      dispatch(userInfoTrigger(token));
    }
  }, [token, dispatch, auth]);
  const mainContainerClasses = getClassNameByCondition(
    styles,
    "mainContainer",
    "admin",
    !!role_title && role_title === "admin"
  );
  return (
    <div className={mainContainerClasses}>
      {role_title && role_title === "admin" && <AdminPanelLink />}
      <AppRouter />
    </div>
  );
};

export default MainContainer;