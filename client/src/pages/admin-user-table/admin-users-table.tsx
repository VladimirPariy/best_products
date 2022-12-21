import Title from "components/ui/title/title";
import AdminApi from "lib/api/admin-api";
import {IRole, IUser} from "lib/interfaces/user-interfaces/user";
import {useAppSelector} from "lib/store/store-types";
import {selectUser} from "lib/store/user/user-selector";
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import styles from "pages/admin-user-table/admin-users-table.module.scss";

interface IUserRoleChange {
  user_id: number;
  role: number
}

const AdminUsersTable: FC = () => {
  const [usersList, setUsersList] = useState<IUser[]>([])
  const [rolesList, setRolesList] = useState<IRole[]>([])

  const currentUser = useAppSelector(selectUser)

  useEffect(() => {
    AdminApi.getAllUsers().then(data => setUsersList(data))
    AdminApi.getAllRoles().then(data => setRolesList(data))
  }, [])

  const roleChangeHandler = async (e: ChangeEvent<HTMLSelectElement>, user_id: number) => {
    await AdminApi.changeUserRole(user_id, +e.target.value)
    AdminApi.getAllUsers().then(data => setUsersList(data))
  }


  const removeUserHandler = async (id: number) => {
    await AdminApi.removeOneUser(`${id}`)
    AdminApi.getAllUsers().then(data => setUsersList(data))
  }

  return (
    <div className={styles.tableWrapper}>
      <Title>
        Users control
      </Title>
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
        {usersList.map((user, index) => (
          <tr key={user.user_id}>
            <td>{index + 1}</td>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.phone_number}</td>

            <td className={styles.selectWrapper}>
              <select defaultValue={user.users_roles.role_id}
                      onChange={(e) => roleChangeHandler(e, user.user_id)}
                      disabled={user.user_id === currentUser.user_id}
                      className={styles.tableSelect}>
                {rolesList.map((role) => (
                  <option value={role.role_id}
                          key={role.role_id}>
                    {role.role_title}
                  </option>
                ))
                }
              </select>
            </td>
            <td className={styles.btnWrapper}>
              <button disabled={user.user_id === currentUser.user_id}
                      className={styles.tableBtn}
                      onClick={() => removeUserHandler(user.user_id)}>
                Delete user
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;