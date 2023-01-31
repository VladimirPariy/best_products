import React, { FC } from "react";

import styles from "layout/header/components/burger-menu.module.scss";

import { addTwoClassNames } from "lib/utils/add-two-class-names";
import { selectBurgerMenu } from "store/modals/modals-selectors";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
import { setVisibilityBurgerMenu } from "store/modals/modals-actions";

const BurgerMenu: FC = () => {
  const dispatch = useAppDispatch();
  const checkedBurgerMenu = useAppSelector(selectBurgerMenu);
  return (
    <div className={styles.burger_menu}>
      <input
        type="checkbox"
        className={styles.burgerCheckbox}
        checked={checkedBurgerMenu}
        onChange={(e) => dispatch(setVisibilityBurgerMenu(e.target.checked))}
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
