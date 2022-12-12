import {getClassNameByCondition} from "lib/utils/get-class-by-condition";
import React, {FC, ReactNode} from "react";

import styles from "components/ui/modal-button/modal-buttom.module.scss"

interface Props {
  children: ReactNode;
  isPurpleButton?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  submitHandler: () => void
}

const ModalButton: FC<Props> = (props) => {
  const {children, submitHandler, isPurpleButton = true, type = "submit"} = props

  const buttonStyles = getClassNameByCondition(styles, 'button', 'purpleButton', isPurpleButton, 'whiteButton')

  return (
    <button className={buttonStyles} type={type} onSubmit={submitHandler}>
      {children}
    </button>
  );
};

export default ModalButton;