import {RootState} from "lib/store/store-types";

const selectUsersRoles = (state: RootState) => state.usersRoles.rolesList;
const selectUsersRolesStatus = (state: RootState) => state.usersRoles.isFetch;
const selectUsersRolesError = (state: RootState) => state.usersRoles.error;

export {selectUsersRoles, selectUsersRolesError, selectUsersRolesStatus};