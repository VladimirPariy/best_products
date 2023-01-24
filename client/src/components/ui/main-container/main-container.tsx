import React, { FC, useEffect } from "react";

import styles from "components/ui/main-container/main-container.module.scss";

import AppRouter from "components/router/app-router/app-router";
import AdminPanelLink from "components/ui/admin-panel-link/admin-panel-link";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import {
  clearFavorite,
  getFavoriteProductsTrigger,
} from "store/favorite-products/favorite-products-actions";
import {
  clearFeedbacks,
  getFeedbacksTrigger,
} from "store/feedbacks/feedbacks-actions";
import { useAppDispatch, useAppSelector } from "store/store-types";
import { userInfoTrigger } from "store/user/user-actions";
import { selectAuth, selectUser } from "store/user/user-selector";
import { getTokenFromStorage } from "lib/utils/token-from-storage";

const MainContainer: FC = () => {
  const dispatch = useAppDispatch();
  const token = getTokenFromStorage();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  let role_title;
  if (user.users_roles) {
    role_title = user.users_roles.role_title;
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
  useEffect(() => {
    if (user?.user_id) {
      dispatch(getFavoriteProductsTrigger(user.user_id));
      dispatch(getFeedbacksTrigger(user.user_id));
    }
    if (Object.keys(user).length === 0) {
      dispatch(clearFavorite());
      dispatch(clearFeedbacks());
    }
  }, [user]);
  return (
    <div className={mainContainerClasses}>
      {role_title && role_title === "admin" && <AdminPanelLink />}
      <AppRouter />
    </div>
  );
};

export default MainContainer;
