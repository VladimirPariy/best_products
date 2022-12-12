import React, {Dispatch, FC, SetStateAction} from "react";

import styles from "components/ui/modal-checkbox/modal-checkbox.module.scss"

interface Props {
  value: boolean;
  changeHandler: Dispatch<SetStateAction<boolean>>;
  type?: string;
  children?: string
}

const ModalCheckbox: FC<Props> = (props) => {
  const {children, type = 'checkbox', changeHandler, value} = props;
  return (
    <label className={styles.label}>
      <input className={styles.checkbox} type={type} onChange={(e) => changeHandler(e.target.checked)} checked={value}/>
      <div className={styles.checkboxExplanation}>
        {children}
      </div>
    </label>
  );
};

export default ModalCheckbox;