import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import styles from "components/sign-in-modal/sign-in-modal.module.scss";

import { ILoginData } from "lib/interfaces/user-interfaces/login-data";
import { useAppDispatch, useAppSelector } from "lib/store/store-types";
import { userInfoTrigger, userTokenTrigger } from "lib/store/user/user-actions";
import { selectAuth, selectToken } from "lib/store/user/user-selector";
import Button from "components/ui/button/button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import Input from "components/ui/input/input";
import Title from "components/ui/title/title";
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
  const token = useAppSelector(selectToken);

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const loginHandler = () => {
    dispatch(
      userTokenTrigger(
        new ILoginData({
          login,
          password,
        })
      )
    );
  };

  useEffect(() => {
    if (token) {
      if (isRemember) localStorage.setItem("token", token);
      else sessionStorage.setItem("token", token);
      dispatch(userInfoTrigger(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const showRegistrationModalHandler = () => {
    setIsShowLoginModal(false);
    setIsShowRegistrationModal(true);
  };

  useEffect(() => {
    auth && setIsShowLoginModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <ModalWrapper setVisible={setIsShowLoginModal} isVisible={isShowLoginModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <Title>SIGN IN</Title>
        <Input
          labelText="Email address or mobile phone number"
          changeHandler={(e) => setLogin(e.target.value)}
          value={login}
        />
        <Input
          labelText="Password"
          changeHandler={(e) => setPassword(e.target.value)}
          value={password}
        />
        <ModalCheckbox value={isRemember} changeHandler={setIsRemember}>
          Remember me
        </ModalCheckbox>
        <Button
          submitHandler={loginHandler}
          type="button"
          children="Continue"
        />

        <div className={styles.separator}>
          <span>Don't have an account yet?</span>
        </div>

        <Button
          submitHandler={showRegistrationModalHandler}
          isPurpleButton={false}
          type="button"
          children="Create your Best Product account"
        />
      </div>
    </ModalWrapper>
  );
};

export default SignInModal;
