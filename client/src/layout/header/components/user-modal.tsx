import React, { FC } from "react";

import styles from "layout/header/components/user-modal.module.scss";

interface Props {}

const UserModal: FC<Props> = (props) => {
  return (
    <div className={styles.userModal} onClick={(e) => e.stopPropagation()}>
      <span>Your name </span>
      <button>Log out</button>
    </div>
  );
};

export default UserModal;
