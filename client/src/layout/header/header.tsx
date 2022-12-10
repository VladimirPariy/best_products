import React, {FC, useState} from "react";

import {useScreenWidth} from "lib/hooks/use-screen-width";

import DesktopHeader from "layout/header/components/desktop-header";
import PhoneHeader from "layout/header/components/phone-header";


interface Props {
  isShowUserModal: boolean;
  setIsShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowRegistrationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<Props> = (props) => {
  const {setIsShowRegistrationModal, setIsShowLoginModal, setIsShowAccountModal} = props

  const [checkedBurgerMenu, setCheckedBurgerMenu] = useState<boolean>(false);
  const userScreenWidth = useScreenWidth();

  return userScreenWidth > 768 ? <DesktopHeader {...props}/> :
    <PhoneHeader checkedBurgerMenu={checkedBurgerMenu} setCheckedBurgerMenu={setCheckedBurgerMenu} setIsShowAccountModal={setIsShowAccountModal} setIsShowRegistrationModal={setIsShowRegistrationModal}
                 setIsShowLoginModal={setIsShowLoginModal}/>;
};

export default Header;
