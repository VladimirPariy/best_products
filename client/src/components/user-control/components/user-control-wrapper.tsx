import React, { FC, ReactNode } from "react";

import styles from "components/user-control/components/user-control-wrapper.module.scss";

interface Props {
  children: ReactNode;
}

const UserControlWrapper: FC<Props> = ({ children }) => {
  return <table className={styles.table}>{children}</table>;
};

export default UserControlWrapper;
