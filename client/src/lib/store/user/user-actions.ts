import {userSlice} from "lib/store/user/user-slice";

export const {
  userInfoRejected,
  userInfoFulfilled,
  userInfoPending,
  updateUserPending,
  updateUserReject,
  updateUserFulfilled,
  userRegistrationTrigger,
  userLoginTrigger,
  userUpdateTrigger,
  clearUser,
} = userSlice.actions;
