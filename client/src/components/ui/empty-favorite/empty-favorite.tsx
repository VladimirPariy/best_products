import React, { FC } from "react";

import styles from "components/ui/empty-favorite/empty-favorite.module.scss";

const EmptyFavorite: FC = () => {
  return (
    <div className={styles.emptyList}>
      <p>List is empty</p>
    </div>
  );
};

export default EmptyFavorite;
