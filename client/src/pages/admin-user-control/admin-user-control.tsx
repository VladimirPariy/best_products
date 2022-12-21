import AdminApi from "lib/api/admin-api";
import {IRole, IUser} from "lib/interfaces/user-interfaces/user";
import React, {ChangeEvent, FC, useEffect, useState} from "react";

interface IUserRoleChange {
  user_id: number;
  role: number
}

const AdminUserControl: FC = () => {
  const [usersList, setUsersList] = useState<IUser[]>([])
  const [rolesList, setRolesList] = useState<IRole[]>([])

  useEffect(() => {
    AdminApi.getAllUsers().then(data => setUsersList(data))
    AdminApi.getAllRoles().then(data => setRolesList(data))
  }, [])
  let usersRoleChange = [] as IUserRoleChange[]
  const roleChangeHandler = (e: ChangeEvent<HTMLSelectElement>, user_id: number) => {
    usersRoleChange = [...usersRoleChange, {user_id, role: +e.target.value}]
    console.log(usersRoleChange)
  }

  return (
    <div>
      {usersList.map((user, index) => (
        <div key={user.user_id} style={{display: 'flex', gap: '10px'}}>
          <span>
            {index + 1}
          </span>
          <span>
            {user.user_id}
          </span>
          <span>
            {user.first_name} {user.last_name}
          </span>
          <span>{user.email}</span>
          <span>{user.phone_number}</span>
          <span>{user.users_roles.role_title}</span>
          <select defaultValue={user.users_roles.role_id} onChange={(e) => roleChangeHandler(e, user.user_id)}>
            {
              rolesList.map((role) => (
                <option value={role.role_id} key={role.role_id}>{role.role_title}</option>
              ))
            }
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminUserControl;