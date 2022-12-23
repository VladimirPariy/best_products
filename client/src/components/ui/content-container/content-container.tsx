import React, {FC, ReactNode} from "react";

import styles from "components/ui/content-container/content-container.module.scss"

interface Props {
  children:ReactNode;
}

const ContentContainer: FC<Props> = ({children}) => {
  return (
    <div className={styles.contentContainer}>
      {children}
    </div>
  );
};

export default ContentContainer;