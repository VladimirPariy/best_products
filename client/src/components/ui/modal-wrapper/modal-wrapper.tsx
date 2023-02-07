import React, { FC, ReactNode, MouseEvent } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import styles from "components/ui/modal-wrapper/modal-wrapper.module.scss";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";
import { useAppDispatch } from "lib/interfaces/store.types";

interface Props {
  children: ReactNode;
  setVisible: ActionCreatorWithPayload<boolean, string>;
  isVisible: boolean;
  isAccModal?: boolean;
}

const ModalWrapper: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { isAccModal, isVisible, setVisible, children } = props;
  const wrapperClasses = getClassNameByCondition(
    styles,
    "modalWrapper",
    "active",
    isVisible
  );
  const modal = getClassNameByCondition(
    styles,
    "modal",
    "accModal",
    !!isAccModal
  );

  const modalHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const closeModalArea = () => {
    dispatch(setVisible(false));
  };
  return (
    <div onClick={closeModalArea} className={wrapperClasses}>
      <div className={styles.container}>
        <div className={modal} onClick={modalHandler}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
