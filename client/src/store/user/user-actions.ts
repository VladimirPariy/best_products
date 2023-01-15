import { userSlice } from "store/user/user-slice";

export const {
  userTokenTrigger,
  userTokenRejected,
  userTokenFulfilled,
  userTokenPending,
  userInfoRejected,
  userInfoFulfilled,
  userInfoPending,
  userInfoTrigger,
  clearUser,
  clearUserError,
  updateUserPending,
  updateUserReject,
  updateUserFulfilled,
  userUpdateTrigger,
} = userSlice.actions;
