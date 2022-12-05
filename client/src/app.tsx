import React, {FC} from "react";

import styles from "app.module.scss"

import Header from "layout/header/header";
import Content from "layout/content/content";

const App: FC = () => {
  return (
    <main className={styles.wrapper}>
      <Header/>
      <Content/>
    </main>
  );
}

export default App;
