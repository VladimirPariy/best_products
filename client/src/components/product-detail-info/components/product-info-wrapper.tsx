import React, {FC, ReactNode} from "react";

import styles from "components/product-detail-info/components/product-info-wrapper.module.scss";

interface Props {
  children: ReactNode
}

const ProductInfoWrapper: FC<Props> = ({children}) => {
  return (
    <div className={styles.prodInfoWrapper}>
      {children}
    </div>
  );
};

export default ProductInfoWrapper;