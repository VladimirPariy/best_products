import {IUser} from "lib/interfaces/user.interface";
import {ErrorPayload, RootState} from "lib/store/store-types";

const selectUser = (state: RootState): IUser => state.user.userInfo;
const selectError = (state: RootState): ErrorPayload | null =>
  state.user.error;
const selectStatus = (state: RootState): boolean =>
  state.user.isFetching;
const selectAuth = (state: RootState): boolean => state.user.auth;
const selectToken = (state: RootState): string => state.user.token;

export {
  selectToken,
  selectAuth,
  selectUser,
  selectStatus,
  selectError,
};
