import React, {FC, ReactNode} from "react";

import styles from "components/ui/product-list-wrapper/product-list-wrapper.module.scss";

interface Props {
  children:ReactNode;
}

const ProductListWrapper: FC<Props> = ({children}) => {
  return (
    <div className={styles.listContainer}>
      {children}
    </div>
  );
};

export default ProductListWrapper;