import React, { FC } from "react";
import styles from "components/ui/product-item/product-item.module.scss";
import { ICharacteristic } from "lib/interfaces/products/product.interface";

interface Props {
  char: ICharacteristic;
}

const CharacteristicItem: FC<Props> = ({ char }) => {
  return (
    <div>
      <span className={styles.charTitle}>
        {char.parameters.parameter_title.at(0)?.toUpperCase()}
        {char.parameters.parameter_title.slice(1)?.toLowerCase()}:
      </span>
      <span>{char.characteristic_title}</span>
    </div>
  );
};

export default CharacteristicItem;
