import { usersRolesSlice } from "lib/store/users-roles/users-roles-slice";

export const {
  usersRolesFulfilled,
  usersRolesRejected,
  usersRolesTrigger,
  usersRolesPending,
} = usersRolesSlice.actions;
