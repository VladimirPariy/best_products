import cl from "components/ui/button/buttom.module.scss";
import {addTwoClassNames} from "lib/utils/add-two-class-names";
import React, {ChangeEvent, FC, ReactNode} from "react";

interface Props {
  fileHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode
}

const BtnForAddImage: FC<Props> = (props) => {
  const {children, fileHandler} = props;
  const buttonClasses = addTwoClassNames(cl, "button", "whiteButton");
  return (

    <label className={buttonClasses}>
      {children}
      <input
        style={{display: 'none'}}
        type="file"
        accept="image/*"
        onChange={fileHandler}
      />
    </label>

  );
};

export default BtnForAddImage;