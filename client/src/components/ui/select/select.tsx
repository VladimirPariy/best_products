import React, { ChangeEvent, FC, ReactNode } from "react";

import styles from "components/ui/select/select.module.scss";

import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

interface Props {
  labelTitle: string;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectDefaultValue: string;
  selectTitle: string;
  children: ReactNode;
  isError?: null | boolean;
  errorNode?: ReactNode;
}

const Select: FC<Props> = (props) => {
  const {
    selectTitle,
    labelTitle,
    selectDefaultValue,
    children,
    changeHandler,
    errorNode,
    isError,
  } = props;
  const errorClassNames = getClassNameByCondition(
    styles,
    "label",
    "error",
    !!isError,
    ""
  );
  return (
    <label className={errorClassNames}>
      {labelTitle}
      <select onChange={changeHandler} defaultValue={selectDefaultValue}>
        <option value="0" disabled hidden>
          {selectTitle}
        </option>
        {children}
      </select>
      {errorNode && <div className={styles.selectExplanation}>{errorNode}</div>}
    </label>
  );
};

export default Select;
