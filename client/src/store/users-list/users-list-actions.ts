import { usersListSlice } from "store/users-list/users-list-slice";

export const {
  usersListFulfilled,
  usersListRejected,
  usersListTrigger,
  usersListPending,
  changeUserRoleTrigger,
  changeUserRoleFulfilled,
  removeUserTrigger,
  removeUserFulfilled,
  clearUserList,
  userPending,
  userRejected,
} = usersListSlice.actions;
