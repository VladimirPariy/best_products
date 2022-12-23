import ContentContainer from "components/ui/content-container/content-container";
import Title from "components/ui/title/title";
import AdminApi from "lib/api/admin-api";
import {useNavigateHome} from "lib/hooks/useNavigateHome";
import {useAppDispatch, useAppSelector} from "lib/store/store-types";
import {usersListTrigger} from "lib/store/user-list/users-list-actions";
import {selectUsersList} from "lib/store/user-list/users-list-selectors";
import {selectUser} from "lib/store/user/user-selector";
import {usersRolesTrigger} from "lib/store/users-roles/users-roles-actions";
import {selectUsersRoles} from "lib/store/users-roles/users-roles-selectors";
import React, {ChangeEvent, FC, useEffect} from "react";
import styles from "pages/users-control/users-control.module.scss";


const UsersControl: FC = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectUser);
  const usersList = useAppSelector(selectUsersList)
  const rolesList = useAppSelector(selectUsersRoles)
  useNavigateHome()

  useEffect(() => {
    dispatch(usersRolesTrigger())
    dispatch(usersListTrigger())
  }, [dispatch]);

  const roleChangeHandler = async (
    e: ChangeEvent<HTMLSelectElement>,
    user_id: number
  ) => {
    await AdminApi.changeUserRole(user_id, +e.target.value);
    dispatch(usersListTrigger())
  };

  const removeUserHandler = async (id: number) => {
    await AdminApi.removeOneUser(id.toString());
    dispatch(usersListTrigger())
  };


  return (
    <ContentContainer>
      <Title>Users control</Title>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
        <tr>
          <td>№</td>
          <td>Full name</td>
          <td>Email</td>
          <td>Phone number</td>
          <td>Role</td>
          <td></td>
        </tr>
        </thead>
        <tbody className={styles.tableBody}>
        {usersList.length > 0 && usersList.map((user, index) => (
            <tr key={user.user_id}>
              <td>{index + 1}</td>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td className={styles.selectWrapper}>
                <select
                  defaultValue={user.users_roles.role_id}
                  onChange={(e) => roleChangeHandler(e, user.user_id)}
                  disabled={user.user_id === currentUser.user_id}
                  className={styles.tableSelect}
                >
                  {rolesList.map((role) => (
                    <option value={role.role_id} key={role.role_id}>
                      {role.role_title}
                    </option>
                  ))}
                </select>
              </td>
              <td className={styles.btnWrapper}>
                <button
                  disabled={user.user_id === currentUser.user_id}
                  className={styles.tableBtn}
                  onClick={() => removeUserHandler(user.user_id)}
                >
                  Delete user
                </button>
              </td>
            </tr>
          )
        )}
        </tbody>
      </table>
    </ContentContainer>
  );
};

export default UsersControl;
