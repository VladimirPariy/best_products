import React, {FC, ReactNode} from "react";

import styles from "components/product-detail-layout/product-detail-layout.module.scss";

interface Props {
  children:ReactNode
}

const ProductDetailLayout: FC<Props> = ({children}) => {
  return (
    <div className={styles.productDetailLayout}>
      {children}
    </div>
  );
};

export default ProductDetailLayout;