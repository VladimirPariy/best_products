import { Dispatch, SetStateAction } from "react";

export interface IModalScreens {
  setIsShowRegistrationModal: Dispatch<SetStateAction<boolean>>;
  setIsShowLoginModal: Dispatch<SetStateAction<boolean>>;
  setIsShowAccountModal: Dispatch<SetStateAction<boolean>>;
}
