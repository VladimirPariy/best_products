import {useAppDispatch, useAppSelector} from "lib/store/store-types";
import {
  selectAuth,
} from "lib/store/user/user-selector";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import styles from "components/sign-in-modal/sign-in-modal.module.scss";

import {userLoginTrigger} from "lib/store/user/user-actions";
import ModalButton from "components/ui/modal-button/modal-button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import ModalInput from "components/ui/modal-input/modal-input";
import ModalTitle from "components/ui/modal-title/modal-title";
import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";

interface Props {
  setIsShowRegistrationModal: Dispatch<SetStateAction<boolean>>;
  setIsShowLoginModal: Dispatch<SetStateAction<boolean>>;
  isShowLoginModal: boolean;
}

const SignInModal: FC<Props> = ({
                                  setIsShowLoginModal,
                                  isShowLoginModal,
                                  setIsShowRegistrationModal,
                                }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const loginHandler = () => {
    dispatch(
      userLoginTrigger({
        login,
        password,
      })
    );
  };

  const showRegistrationModalHandler = () => {
    setIsShowLoginModal(false);
    setIsShowRegistrationModal(true);
  };

  useEffect(() => {
    auth && setIsShowLoginModal(false);
  }, [auth]);

  return (
    <ModalWrapper setVisible={setIsShowLoginModal} isVisible={isShowLoginModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <ModalTitle>SIGN IN</ModalTitle>
        <ModalInput
          labelText="Email address or mobile phone number"
          changeHandler={setLogin}
          value={login}
        />
        <ModalInput
          labelText="Password"
          changeHandler={setPassword}
          value={password}
        />
        <ModalCheckbox value={isRemember} changeHandler={setIsRemember}>
          Remember me
        </ModalCheckbox>
        <ModalButton submitHandler={loginHandler}>Continue</ModalButton>

        <div className={styles.separator}>
          <span>Don't have an account yet?</span>
        </div>

        <ModalButton
          submitHandler={showRegistrationModalHandler}
          isPurpleButton={false}
        >
          Create your Best Product account
        </ModalButton>
      </div>
    </ModalWrapper>
  );
};

export default SignInModal;
