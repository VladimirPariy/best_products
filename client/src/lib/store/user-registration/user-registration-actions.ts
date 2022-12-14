import { userRegistrationSlice } from "lib/store/user-registration/user-registration-slice";

export const {
  userRegistrationRejected,
  userRegistrationPending,
  userRegistrationFulfilled,
  userRegistrationTrigger,
} = userRegistrationSlice.actions;
