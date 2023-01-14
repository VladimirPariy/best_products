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
  updateUserPending,
  updateUserReject,
  updateUserFulfilled,
  userUpdateTrigger,
  clearUser,
} = userSlice.actions;
