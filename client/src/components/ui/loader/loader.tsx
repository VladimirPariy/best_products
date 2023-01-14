import React, { FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import styles from "components/ui/loader/loader.module.scss";

interface Props {
  size?: number;
  color?: string;
}

const Loader: FC<Props> = ({ size = 40, color = "#fff" }) => {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color={color} size={size} className={styles.loader} />
    </div>
  );
};

export { Loader };
