import React, { FC, Dispatch, SetStateAction } from "react";

import styles from "layout/header/components/burger-menu.module.scss";

import { addTwoClassNames } from "lib/utils/add-two-class-names";

interface Props {
  checkedBurgerMenu: boolean;
  setCheckedBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

const BurgerMenu: FC<Props> = ({ checkedBurgerMenu, setCheckedBurgerMenu }) => {
  return (
    <div className={styles.burger_menu}>
      <input
        type="checkbox"
        className={styles.burgerCheckbox}
        checked={checkedBurgerMenu}
        onChange={(e) => setCheckedBurgerMenu(e.target.checked)}
      />
      <div className={styles.hamburger_lines}>
        <span className={addTwoClassNames(styles, "line", "line1")}></span>
        <span className={addTwoClassNames(styles, "line", "line2")}></span>
        <span className={addTwoClassNames(styles, "line", "line3")}></span>
      </div>
    </div>
  );
};

export default BurgerMenu;
