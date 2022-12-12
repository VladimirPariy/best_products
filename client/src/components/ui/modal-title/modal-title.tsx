import React, {FC, ReactNode} from "react";

import styles from "components/ui/modal-title/modal-title.module.scss"

interface Props {
  children:ReactNode;
}

const ModalTitle: FC<Props> = ({children}) => {
  return (
    <div className={styles.title}>
      {children}
    </div>
  );
};

export default ModalTitle;