import React, { FC } from "react";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import DesktopHeader from "layout/header/components/desktop-header";
import PhoneHeader from "layout/header/components/phone-header";
import { selectBurgerMenu } from "store/modals/modals-selectors";
import { useAppSelector } from "store/store-types";

const Header: FC = () => {
  const userScreenWidth = useScreenWidth();
  const checkedBurgerMenu = useAppSelector(selectBurgerMenu);

  if (checkedBurgerMenu) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  return userScreenWidth > 768 ? <DesktopHeader /> : <PhoneHeader />;
};

export default Header;
