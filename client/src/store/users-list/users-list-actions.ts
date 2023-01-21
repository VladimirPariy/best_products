import { usersListSlice } from "store/users-list/users-list-slice";

export const {
  usersListFulfilled,
  usersListRejected,
  usersListTrigger,
  usersListPending,
  changeUserRoleTrigger,
  changeUserRoleFulfilled,
  changeUserRolePending,
  changeUserRoleRejected,
  removeUserTrigger,
  removeUserFulfilled,
  removeUserPending,
  removeUserRejected,
} = usersListSlice.actions;
