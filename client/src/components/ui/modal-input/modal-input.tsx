import React, { Dispatch, FC, SetStateAction } from "react";

import styles from "components/ui/modal-input/modal-input.module.scss";

interface Props {
  labelText: string;
  type?: string;
  changeHandler: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder?: string;
  children?: string;
}

const ModalInput: FC<Props> = (props) => {
  const {
    labelText,
    type = "text",
    changeHandler,
    value,
    placeholder,
    children,
  } = props;
  return (
    <label className={styles.label}>
      <div className={styles.labelText}>{labelText}</div>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder ? placeholder : ""}
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
      />
      <div className={styles.inputExplanation}>{children}</div>
    </label>
  );
};

export default ModalInput;
