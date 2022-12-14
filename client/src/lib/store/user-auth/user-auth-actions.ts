import { userAuthSlice } from "lib/store/user-auth/user-auth-slice";

export const {
  userAuthFulfilled,
  userAuthPending,
  userRegistrationTrigger,
  userAuthRejected,
  userLoginTrigger,
  clearUser,
} = userAuthSlice.actions;
