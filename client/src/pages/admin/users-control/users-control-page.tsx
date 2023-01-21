import ContentContainer from "components/ui/content-container/content-container";
import Title from "components/ui/title/title";
import userApi from "lib/api/user-api";
import { useAppDispatch, useAppSelector } from "store/store-types";
import { usersListTrigger } from "store/users-list/users-list-actions";
import { selectUsersList } from "store/users-list/users-list-selectors";
import { selectUser } from "store/user/user-selector";
import { usersRolesTrigger } from "store/users-roles/users-roles-actions";
import { selectUsersRoles } from "store/users-roles/users-roles-selectors";
import React, { ChangeEvent, FC, useEffect } from "react";
import styles from "components/user-control/users-control.module.scss";

const UsersControl: FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const usersList = useAppSelector(selectUsersList);
  const rolesList = useAppSelector(selectUsersRoles);

  useEffect(() => {
    dispatch(usersRolesTrigger());
    dispatch(usersListTrigger());
  }, [dispatch]);

  const roleChangeHandler = async (
    e: ChangeEvent<HTMLSelectElement>,
    user_id: number
  ) => {
    await userApi.changeUserRole(user_id, +e.target.value);
    dispatch(usersListTrigger());
  };
  const removeUserHandler = async (id: number) => {
    await userApi.removeOneUser(id.toString());
    dispatch(usersListTrigger());
  };

  return (
    <ContentContainer>
      <Title>Users control</Title>
      <UsersControl />
    </ContentContainer>
  );
};

export default UsersControl;
