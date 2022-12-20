import {getClassNameByCondition} from "lib/utils/get-class-by-condition";
import React, {FC, useEffect} from "react";

import styles from "components/main-container/main-container.module.scss";

import AppRouter from "components/app-router/app-router";
import AdminPanelLink from "components/ui/admin-panel-link/admin-panel-link";

import {useAppDispatch, useAppSelector} from "lib/store/store-types";
import {userInfoTrigger} from "lib/store/user/user-actions";
import {selectAuth, selectUser} from "lib/store/user/user-selector";
import {getTokenFromStorage} from "lib/utils/TokenFromStorage";

interface Props {
}

const MainContainer: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const token = getTokenFromStorage();
  const auth = useAppSelector(selectAuth);
  const {role_name} = useAppSelector(selectUser)

  useEffect(() => {
    if (token && !auth) {
      dispatch(userInfoTrigger(token));
    }
  }, [token]);

  const mainContainerClasses = getClassNameByCondition(styles, 'mainContainer', 'admin', role_name === 'admin')
  return (
    <div className={mainContainerClasses}>
      {role_name === 'admin' && <AdminPanelLink/>}
      <AppRouter/>
    </div>
  );
};

export default MainContainer;