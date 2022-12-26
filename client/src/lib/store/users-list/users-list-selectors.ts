import { IUser } from "lib/interfaces/user-interfaces/user";
import { ErrorPayload, RootState } from "lib/store/store-types";

const selectUsersList = (state: RootState): IUser[] =>
  state.usersList.usersList;
const selectUsersListError = (state: RootState): ErrorPayload | null =>
  state.usersList.error;
const selectUsersListStatus = (state: RootState): boolean =>
  state.usersList.isFetching;

export { selectUsersList, selectUsersListStatus, selectUsersListError };
