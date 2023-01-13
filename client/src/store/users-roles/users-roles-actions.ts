import { usersRolesSlice } from "store/users-roles/users-roles-slice";

export const {
  usersRolesFulfilled,
  usersRolesRejected,
  usersRolesTrigger,
  usersRolesPending,
} = usersRolesSlice.actions;
