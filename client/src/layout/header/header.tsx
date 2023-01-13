import React, { FC, useState } from "react";

import { useScreenWidth } from "lib/hooks/use-screen-width";

import DesktopHeader from "layout/header/components/desktop-header";
import PhoneHeader from "layout/header/components/phone-header";

const Header: FC = () => {
  const [checkedBurgerMenu, setCheckedBurgerMenu] = useState<boolean>(false);
  const userScreenWidth = useScreenWidth();

  if (checkedBurgerMenu) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  return userScreenWidth > 768 ? (
    <DesktopHeader />
  ) : (
    <PhoneHeader
      checkedBurgerMenu={checkedBurgerMenu}
      setCheckedBurgerMenu={setCheckedBurgerMenu}
    />
  );
};

export default Header;
