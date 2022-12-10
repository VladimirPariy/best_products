import React, { FC, useState, Dispatch, SetStateAction } from "react";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import { IModalScreens } from "lib/interfaces/modal-screens.interface";
import DesktopHeader from "layout/header/components/desktop-header";
import PhoneHeader from "layout/header/components/phone-header";

interface Props extends IModalScreens {
  isShowUserModal: boolean;
  setIsShowUserModal: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<Props> = (props) => {
  const { isShowUserModal, setIsShowUserModal, ...setIsShowModals } = props;

  const [checkedBurgerMenu, setCheckedBurgerMenu] = useState<boolean>(false);
  const userScreenWidth = useScreenWidth();

  return userScreenWidth > 768 ? (
    <DesktopHeader {...props} />
  ) : (
    <PhoneHeader
      checkedBurgerMenu={checkedBurgerMenu}
      setCheckedBurgerMenu={setCheckedBurgerMenu}
      {...setIsShowModals}
    />
  );
};

export default Header;
