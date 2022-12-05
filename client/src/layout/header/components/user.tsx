import React, {FC} from "react";

import styles from "layout/header/header.module.scss";
import userImg from "assets/icon/header/user.svg"


interface Props {
}

const User: FC<Props> = (props) => {
  return (
    <div className={styles.userContainer}>
      <img src={userImg} alt="" className={styles.userImage}/>
    </div>
  );
};

export default User;