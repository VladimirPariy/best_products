import { ICharacteristics } from "lib/interfaces/characteristics/characteristic";
import React, { ChangeEvent, FC } from "react";

import styles from "components/filter-panel/components/characteristic-input.module.scss";

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
  return (
    <label key={char.characteristic_id} className={styles.charTitle}>
      <input
        checked={
          !!selectedParameters.find(
            (param) => param === `${char.characteristic_id}`
          )
        }
        type="checkbox"
        value={char.characteristic_id}
        onChange={changeHandler}
      />
      {upFirstChar(char.characteristic_title)}
    </label>
  );
};

export default CharacteristicInput;
