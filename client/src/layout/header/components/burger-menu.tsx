import React, { ChangeEvent, FC } from "react";

import styles from "layout/header/components/burger-menu.module.scss";

import { addTwoClassNames } from "lib/utils/add-two-class-names";
import { selectBurgerMenu } from "store/modals/modals-selectors";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
import { setVisibilityBurgerMenu } from "store/modals/modals-actions";

const burger = [
  addTwoClassNames(styles, "line", "line1"),
  addTwoClassNames(styles, "line", "line2"),
  addTwoClassNames(styles, "line", "line3"),
];

const BurgerMenu: FC = () => {
  const dispatch = useAppDispatch();
  const checkedBurgerMenu = useAppSelector(selectBurgerMenu);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setVisibilityBurgerMenu(e.target.checked));
  };
  return (
    <div className={styles.burger_menu}>
      <input
        type="checkbox"
        className={styles.burgerCheckbox}
        checked={checkedBurgerMenu}
        onChange={changeHandler}
      />
      <div className={styles.hamburger_lines}>
        {burger.map((item, index) => (
          <span className={item} key={index}></span>
        ))}
      </div>
    </div>
  );
};

export default BurgerMenu;
