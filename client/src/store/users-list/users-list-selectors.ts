import { IUser } from "lib/interfaces/user/user.interface";
import { RootState } from "lib/interfaces/store.types";

export const selectUsersList = (state: RootState): IUser[] =>
  state.usersList.usersList;
