import React, { FC } from "react";

import Header from "layout/header/header";
import Content from "layout/content/content";

import { clearModal } from "store/modals/modals-actions";
import { selectModal } from "store/modals/modals-selectors";
import { useAppDispatch, useAppSelector } from "store/store-types";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const allModal = Object.values(useAppSelector(selectModal));
  const mainClickHandler = () => {
    if (allModal.includes(true)) dispatch(clearModal());
  };

  return (
    <main onClick={mainClickHandler}>
      <Header />
      <Content />
    </main>
  );
};

export default App;
