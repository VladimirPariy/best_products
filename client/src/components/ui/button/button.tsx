import React, {FC, ReactNode, MouseEvent} from "react";

import styles from "components/ui/button/buttom.module.scss";
import {getClassNameByCondition} from "lib/utils/get-class-by-condition";

interface Props {
  children: ReactNode;
  isPurpleButton?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  submitHandler: (() => void) | ((e: MouseEvent<HTMLButtonElement>) => void);
  style?: React.CSSProperties | undefined;
}

const Button: FC<Props> = (props) => {
  const {
    children,
    submitHandler,
    isPurpleButton = true,
    type = "submit",
    style
  } = props;

  const buttonStyles = getClassNameByCondition(
    styles,
    "button",
    "purpleButton",
    isPurpleButton,
    "whiteButton"
  );

  return (
    <button className={buttonStyles} type={type} onClick={submitHandler} style={style}>
      {children}
    </button>
  );
};

export default Button;
