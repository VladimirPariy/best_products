import React, { FC } from "react";

import styles from "components/product-detail-tabs/components/characteristic-tab/characteristics-tab.module.scss";

import { upFirstChar } from "lib/utils/up-first-char";
import { ICharacteristicsWithParameters } from "lib/interfaces/characteristics/characteristic.interface";

interface Props {
  characteristics: ICharacteristicsWithParameters[];
}

const CharacteristicsTab: FC<Props> = ({ characteristics }) => {
  return (
    <div className={styles.characteristicsContainer}>
      {characteristics.map((item, index) => (
        <div key={index} className={styles.charWrapper}>
          <span className={styles.paramTitle}>
            {upFirstChar(item.parameters.parameter_title)}:
          </span>
          <span className={styles.charTitle}>{item.characteristic_title}</span>
        </div>
      ))}
    </div>
  );
};

export default CharacteristicsTab;
