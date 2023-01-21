import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import React, { ChangeEvent, FC, ReactNode } from "react";

import styles from "components/ui/text-area/text-area.module.scss";

interface Props {
  changeHandler: (() => void) | ((e: ChangeEvent<HTMLTextAreaElement>) => void);
  value: string;
  labelText?: string;
  children?: ReactNode;
  isError?: null | boolean;
}

const TextArea: FC<Props> = (props) => {
  const { labelText, changeHandler, value, isError, children } = props;

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
      <textarea
        className={styles.textArea}
        value={value}
        onChange={changeHandler}
      />
      <div className={styles.inputExplanation}>{children}</div>
    </label>
  );
};

export default TextArea;
