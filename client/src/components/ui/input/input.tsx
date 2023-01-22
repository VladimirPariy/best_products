import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import React, { ChangeEvent, FC, ReactNode } from "react";

import styles from "components/ui/input/input.module.scss";

interface Props {
  labelText: string;
  type?: string;
  changeHandler: (() => void) | ((e: ChangeEvent<HTMLInputElement>) => void);
  value: string;
  placeholder?: string;
  children?: ReactNode;
  min?: number;
  isError?: null | boolean;
}

const Input: FC<Props> = (props) => {
  const {
    labelText,
    type = "text",
    changeHandler,
    value,
    placeholder,
    children,
    min,
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
      <div className={styles.labelText}>{labelText}</div>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder ? placeholder : ""}
        value={value}
        onChange={changeHandler}
        min={min}
      />
      {children && <div className={styles.inputExplanation}>{children}</div>}
    </label>
  );
};

export default Input;
