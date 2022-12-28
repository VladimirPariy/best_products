import React, { ChangeEvent, FC, ReactNode } from "react";

import styles from "components/ui/select/select.module.scss";

interface Props {
  labelTitle: string;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectDefaultValue: string;
  selectTitle: string;
  children: ReactNode;
}

const Select: FC<Props> = (props) => {
  const {
    selectTitle,
    labelTitle,
    selectDefaultValue,
    children,
    changeHandler,
  } = props;
  return (
    <label className={styles.label}>
      {labelTitle}
      <select onChange={changeHandler} defaultValue={selectDefaultValue}>
        <option value="0" disabled hidden>
          {selectTitle}
        </option>
        {children}
      </select>
    </label>
  );
};

export default Select;
