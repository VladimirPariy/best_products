import { userSlice } from "lib/store/user/user-slice";

export const {
  userInfoRejected,
  userInfoFulfilled,
  userInfoPending,
  userInfoTrigger,
  userTokenRejected,
  userTokenFulfilled,
  userTokenPending,
  userTokenTrigger,

  updateUserPending,
  updateUserReject,
  updateUserFulfilled,
  userUpdateTrigger,
  clearUser,
} = userSlice.actions;
