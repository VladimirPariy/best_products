import { usersListSlice } from "lib/store/users-list/users-list-slice";

export const {
  usersListFulfilled,
  usersListRejected,
  usersListTrigger,
  usersListPending,
} = usersListSlice.actions;
