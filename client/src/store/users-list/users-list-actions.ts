import { usersListSlice } from "store/users-list/users-list-slice";

export const {
  usersListFulfilled,
  usersListRejected,
  usersListTrigger,
  usersListPending,
} = usersListSlice.actions;
