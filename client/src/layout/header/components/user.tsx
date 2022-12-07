import React, {FC} from "react";

import {useScreenWidth} from "lib/hooks/use-screen-width";

import styles from "layout/header/components/user.module.scss";
import userImg from "assets/icon/header/user.svg"


interface Props {
}

const User: FC<Props> = (props) => {
  const userScreenWidth = useScreenWidth()
  return (
    <div className={styles.userContainer}>
      <img src={userImg} alt="" className={styles.userImage}/>
      {
        userScreenWidth > 768 ? null :
          <>
            <span>Your name </span>
            <button>Log out</button>
          </>
      }
    </div>
  );
};

export default User;