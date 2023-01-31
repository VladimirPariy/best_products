import React, { FC } from "react";

import styles from "components/product-detail/product-detail-info/components/product-shot-characteristics.module.scss";

import { ICharacteristicsWithParameters } from "lib/interfaces/characteristic.interface";
import { upFirstChar } from "lib/utils/up-first-char";

interface Props {
  characteristics: ICharacteristicsWithParameters[];
}

const ProductShotCharacteristics: FC<Props> = ({ characteristics }) => {
  const parameters = new Set(
    characteristics.map((item) => item.parameters.parameter_title)
  );
  const modifyParams = [...parameters].map((parameter) => {
    return {
      parameter: parameter,
      characteristics: characteristics
        .filter((item) => item.parameters.parameter_title === parameter)
        .map((item) => item.characteristic_title),
    };
  });

  return (
    <div className={styles.characteristicsWrapper}>
      {modifyParams.map((item) => (
        <div key={item.parameter} className={styles.charContainer}>
          <span className={styles.charParam}>
            {upFirstChar(item.parameter)}:{" "}
          </span>
          <span className={styles.charNames}>
            {item.characteristics.join(", ")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductShotCharacteristics;
