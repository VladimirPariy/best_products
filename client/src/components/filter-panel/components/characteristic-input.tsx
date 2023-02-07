import React, { ChangeEvent, FC } from "react";

import styles from "components/filter-panel/components/characteristic-input.module.scss";

import { ICharacteristics } from "lib/interfaces/characteristic.interface";
import { upFirstChar } from "lib/utils/up-first-char";

interface Props {
  char: ICharacteristics;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedParameters: string[];
}

const CharacteristicInput: FC<Props> = ({
  char,
  selectedParameters,
  changeHandler,
}) => {
  const isChecked = !!selectedParameters.find(
    (param) => param === `${char.characteristic_id}`
  );
  return (
    <label key={char.characteristic_id} className={styles.charTitle}>
      <input
        checked={isChecked}
        type="checkbox"
        value={char.characteristic_id}
        onChange={changeHandler}
      />
      <span>{upFirstChar(char.characteristic_title)}</span>
    </label>
  );
};

export default CharacteristicInput;
