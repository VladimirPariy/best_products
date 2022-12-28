import React, { FC } from "react";
import styles from "components/ui/add-product-characteristic-title/add-product-characteristic-title.module.scss";

interface Props {
  index: number;
}

const AddProductCharacteristicTitle: FC<Props> = ({ index }) => {
  return (
    <div className={styles.characteristicTitle}>{index + 1} characteristic</div>
  );
};

export default AddProductCharacteristicTitle;
