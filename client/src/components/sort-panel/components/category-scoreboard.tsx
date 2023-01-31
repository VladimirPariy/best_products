import React, { FC } from "react";
import styles from "components/sort-panel/components/category-scoreboard.module.scss";
import { upFirstChar } from "lib/utils/up-first-char";

interface Props {
  category: string;
}

const CategoryScoreboard: FC<Props> = ({ category }) => {
  return (
    <div className={styles.category}>
      Category:
      <span className={styles.categoryTitle}>{upFirstChar(category)}</span>
    </div>
  );
};

export default CategoryScoreboard;
