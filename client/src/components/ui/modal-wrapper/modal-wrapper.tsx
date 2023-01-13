import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "store/store-types";
import React, { FC, ReactNode } from "react";

import styles from "components/ui/modal-wrapper/modal-wrapper.module.scss";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

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
  return (
    <div onClick={() => dispatch(setVisible(false))} className={wrapperClasses}>
      <div className={styles.container}>
        <div className={modal} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
