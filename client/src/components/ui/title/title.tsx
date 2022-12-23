import React, { FC, ReactNode } from "react";

import styles from "components/ui/title/title.module.scss";

interface Props {
  children: ReactNode;
}

const Title: FC<Props> = ({ children }) => {
  return <div className={styles.title}>{children}</div>;
};

export default Title;
