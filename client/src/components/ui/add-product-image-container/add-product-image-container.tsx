import React, {FC, ReactNode} from "react";

import styles from "components/ui/add-product-image-container/add-product-image-container.module.scss"

interface Props {
  children:ReactNode
}

const AddProductImageContainer: FC<Props> = ({children}) => {
  return (
    <div className={styles.imageContainer}>
      {children}
    </div>
  );
};

export default AddProductImageContainer;