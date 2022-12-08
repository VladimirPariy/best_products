import React, { FC } from "react";
import styles from "layout/header/components/burger-menu.module.scss";
import { addTwoClassNames } from "lib/utils/add-two-class-names";

interface Props {
  value: boolean;
  checkedHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const BurgerMenu: FC<Props> = ({ value, checkedHandler }) => {
  return (
    <div className={styles.burger_menu}>
      <input
        type="checkbox"
        className={styles.burgerCheckbox}
        checked={value}
        onChange={(e) => checkedHandler(e.target.checked)}
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
