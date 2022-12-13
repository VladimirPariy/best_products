import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";

import styles from "components/ui/modal-wrapper/modal-wrapper.module.scss";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

interface Props {
  children: ReactNode;
  setVisible: Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

const ModalWrapper: FC<Props> = ({ children, setVisible, isVisible }) => {
  const wrapperClasses = getClassNameByCondition(
    styles,
    "modalWrapper",
    "active",
    isVisible
  );
  return (
    <div onClick={() => setVisible(false)} className={wrapperClasses}>
      <div className={styles.container}>
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
        {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
