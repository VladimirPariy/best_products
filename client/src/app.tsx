import React, { FC, useState } from "react";

import styles from "app.module.scss";

import Header from "layout/header/header";
import Content from "layout/content/content";

const App: FC = () => {
  const [isShowUserModal, setIsShowUserModal] = useState(false);
  return (
    <main className={styles.wrapper} onClick={() => setIsShowUserModal(false)}>
      <Header
        isShowUserModal={isShowUserModal}
        setIsShowUserModal={setIsShowUserModal}
      />
      <Content />
    </main>
  );
};

export default App;
