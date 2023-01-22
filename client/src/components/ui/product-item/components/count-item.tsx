import React, { FC, ReactNode } from "react";
import styles from "components/ui/product-item/product-item.module.scss";

interface Props {
  value: number;
  children: ReactNode;
  className: string;
}

const CountItem: FC<Props> = ({ children, value, className }) => {
  return (
    <div className={className}>
      <span className={styles.icon}>{children}</span>
      <span>{value}</span>
    </div>
  );
};

export default CountItem;
