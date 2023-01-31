import { RootState } from "lib/interfaces/store.types";

export const selectUsersRoles = (state: RootState) =>
  state.usersRoles.rolesList;
