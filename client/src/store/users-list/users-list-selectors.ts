import { IUser } from "lib/interfaces/user/user";
import { ErrorPayload, RootState } from "store/store-types";

const selectUsersList = (state: RootState): IUser[] =>
  state.usersList.usersList;
const selectUsersListError = (state: RootState): ErrorPayload | null =>
  state.usersList.error;
const selectUsersListStatus = (state: RootState): boolean =>
  state.usersList.isFetching;

export { selectUsersList, selectUsersListStatus, selectUsersListError };
