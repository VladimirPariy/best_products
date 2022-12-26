import React, { ChangeEvent, FC } from "react";

import styles from "components/ui/text-area/text-area.module.scss";

interface Props {
  labelText: string;
  changeHandler: (() => void) | ((e: ChangeEvent<HTMLTextAreaElement>) => void);
  value: string;
}

const TextArea: FC<Props> = (props) => {
  const { labelText, changeHandler, value } = props;
  return (
    <label className={styles.label}>
      <div className={styles.labelText}>
        {labelText}
      </div>
      <textarea
        className={styles.textArea}
        value={value}
        onChange={changeHandler}
      />
    </label>
  );
};

export default TextArea;
