import React, { ChangeEvent, FC, useEffect } from "react";

import styles from "components/user-control/components/user-control-body.module.scss";

import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
import { selectUser } from "store/user/user-selector";
import {
  changeUserRoleTrigger,
  clearUserList,
  removeUserTrigger,
  usersListTrigger,
} from "store/users-list/users-list-actions";
import { selectUsersList } from "store/users-list/users-list-selectors";
import {
  clearUsersRoles,
  usersRolesTrigger,
} from "store/users-roles/users-roles-actions";
import { selectUsersRoles } from "store/users-roles/users-roles-selectors";

const UserControlBody: FC = () => {
  const currentUser = useAppSelector(selectUser);
  const usersList = useAppSelector(selectUsersList);
  const rolesList = useAppSelector(selectUsersRoles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersRolesTrigger());
    dispatch(usersListTrigger());
    return () => {
      dispatch(clearUserList());
      dispatch(clearUsersRoles());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roleChangeHandler = async (
    e: ChangeEvent<HTMLSelectElement>,
    user_id: number
  ) => {
    dispatch(
      changeUserRoleTrigger({
        userId: user_id,
        newRole: +e.target.value,
      })
    );
  };
  const removeUserHandler = async (id: number) => {
    dispatch(removeUserTrigger(id));
  };

  return (
    <tbody className={styles.tableBody}>
      {usersList.length > 0 &&
        usersList.map((user, index) => (
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
        ))}
    </tbody>
  );
};

export default UserControlBody;
