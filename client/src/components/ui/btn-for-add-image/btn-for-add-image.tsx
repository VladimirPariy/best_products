import React, { ChangeEvent, FC, ReactNode } from "react";
import cl from "components/ui/button/buttom.module.scss";
import styles from "components/ui/btn-for-add-image/btn-for-add-image.module.scss";

import { addTwoClassNames } from "lib/utils/add-two-class-names";

interface Props {
  fileHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  errorNode?: ReactNode;
}

const BtnForAddImage: FC<Props> = (props) => {
  const { children, fileHandler, errorNode } = props;
  const buttonClasses = addTwoClassNames(cl, "button", "whiteButton");
  return (
    <>
      <label className={buttonClasses}>
        {children}
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={fileHandler}
        />
      </label>
      {errorNode && <div className={styles.error}>{errorNode}</div>}
    </>
  );
};

export default BtnForAddImage;
