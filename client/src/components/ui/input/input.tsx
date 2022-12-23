import React, { ChangeEvent, FC } from "react";

import styles from "components/ui/input/input.module.scss";

interface Props {
  labelText: string;
  type?: string;
  changeHandler: (() => void) | ((e: ChangeEvent<HTMLInputElement>) => void);
  value: string;
  placeholder?: string;
  children?: string;
  min?: number;
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
  } = props;
  return (
    <label className={styles.label}>
      <div className={styles.labelText}>{labelText}</div>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder ? placeholder : ""}
        value={value}
        onChange={changeHandler}
        min={min}
      />
      <div className={styles.inputExplanation}>{children}</div>
    </label>
  );
};

export default Input;
