import React, { FC, ReactNode, MouseEvent } from "react";
import styles from "components/ui/product-item/product-item.module.scss";

interface Props {
  value: number;
  children: ReactNode;
  className: string;
  feedbackType?: number;
  clickHandler?: (
    e: MouseEvent<HTMLDivElement>,
    feedbackType: number | undefined
  ) => void;
}

const CountItem: FC<Props> = ({
  children,
  value,
  className,
  clickHandler,
  feedbackType,
}) => {
  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    clickHandler?.(e, feedbackType);
  };
  return (
    <div className={className} onClick={onClickHandler}>
      <span className={styles.icon}>{children}</span>
      <span>{value}</span>
    </div>
  );
};

export default CountItem;
