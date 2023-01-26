import React, { FC, ReactNode } from "react";

import styles from "components/ui/table-wrapper/table-wrapper.module.scss";

interface Props {
  children: ReactNode;
}

const TableWrapper: FC<Props> = ({ children }) => {
  return <table className={styles.table}>{children}</table>;
};

export default TableWrapper;
