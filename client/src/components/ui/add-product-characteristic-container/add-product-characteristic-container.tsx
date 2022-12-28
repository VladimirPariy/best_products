import React, { FC, ReactNode } from "react";

import styles from "components/ui/add-product-characteristic-container/add-product-characteristic-container.module.scss";

interface Props {
  children: ReactNode;
}

const AddProductCharacteristicContainer: FC<Props> = ({ children }) => {
  return <div className={styles.characteristicContainer}>{children}</div>;
};

export default AddProductCharacteristicContainer;
