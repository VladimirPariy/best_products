import React, { ChangeEvent, MouseEvent, FC, useEffect, useState } from "react";

import styles from "components/sign-in-modal/sign-in-modal.module.scss";

import { ValidationMessage } from "lib/enums/validation-message";
import { validateLatinLetter } from "lib/utils/validate-latin-letter";
import { ILoginData } from "lib/interfaces/user/login-data.interface";
import { ErrorValidationInterface } from "lib/interfaces/error-validation.interface";

import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
import {
  clearUser,
  userInfoTrigger,
  userTokenTrigger,
} from "store/user/user-actions";
import {
  selectAuth,
  selectToken,
  selectUserError,
  selectUserStatus,
} from "store/user/user-selector";
import {
  setVisibilitySignInModal,
  setVisibilitySignUpModal,
} from "store/modals/modals-actions";
import { selectSignInModal } from "store/modals/modals-selectors";

import ErrorContainer from "components/ui/error-container/error-container";
import { Loader } from "components/ui/loader/loader";
import Button from "components/ui/button/button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import Input from "components/ui/input/input";
import Title from "components/ui/title/title";
import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";

const SignInModal: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const token = useAppSelector(selectToken);
  const isShowSignInModal = useAppSelector(selectSignInModal);
  const isLoading = useAppSelector(selectUserStatus);

  const signInServerError = useAppSelector(selectUserError);

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const [errorLogin, setErrorLogin] = useState<ErrorValidationInterface>(null);
  const [errorPassword, setErrorPassword] =
    useState<ErrorValidationInterface>(null);

  const serverErrorMessage =
    signInServerError && JSON.parse(signInServerError?.status_message).message;

  useEffect(() => {
    if (errorLogin && login?.length > 0) setErrorLogin(null);
    if (errorPassword && (password.length > 4 || validateLatinLetter(password)))
      setErrorPassword(null);
    if (
      signInServerError &&
      (signInServerError.status === 404 || signInServerError.status === 400)
    )
      dispatch(clearUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, password]);

  useEffect(() => {
    if (signInServerError?.status === 404) {
      setErrorLogin(serverErrorMessage);
    }
    if (signInServerError?.status === 400) {
      setErrorPassword(serverErrorMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signInServerError]);

  const loginHandler = () => {
    if (login.length === 0) {
      setErrorLogin(ValidationMessage.required);
    }
    if (password.length < 5) {
      setErrorPassword(ValidationMessage.invalidPassword);
    }
    if (!validateLatinLetter(password)) {
      setErrorPassword(ValidationMessage.onlyLatinLetter);
    }
    if (signInServerError?.status === 404) {
      setErrorLogin(serverErrorMessage);
    }
    if (signInServerError?.status === 400) {
      setErrorPassword(serverErrorMessage);
    }
    if (
      login.length === 0 ||
      password.length < 5 ||
      !validateLatinLetter(password) ||
      signInServerError
    )
      return;
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
    dispatch(setVisibilitySignInModal(false));
    dispatch(setVisibilitySignUpModal(true));
  };

  useEffect(() => {
    auth && dispatch(setVisibilitySignInModal(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const changeLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordError = !!(
    errorPassword ||
    (!validateLatinLetter(password) && password)
  ) ? (
    <div>{errorPassword || ValidationMessage.onlyLatinLetter}</div>
  ) : undefined;

  const passwordErrorCondition =
    !!errorPassword || !!(!validateLatinLetter(password) && password);

  const containerHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const fillingSubmitButton = isLoading ? <Loader size={27} /> : "Continue";

  const inputs = [
    {
      label: "Email address or mobile phone number",
      handler: changeLoginHandler,
      value: login,
      errorCondition: !!errorLogin,
      children: <ErrorContainer errorText={errorLogin} />,
      type: "text",
    },
    {
      label: "Password",
      handler: changePasswordHandler,
      value: password,
      errorCondition: passwordErrorCondition,
      children: passwordError,
      type: "password",
    },
  ];

  return (
    <ModalWrapper
      setVisible={setVisibilitySignInModal}
      isVisible={isShowSignInModal}
    >
      <div onClick={containerHandler}>
        <Title>SIGN IN</Title>
        {inputs.map((item, index) => (
          <Input
            key={index}
            labelText={item.label}
            type={item.type}
            changeHandler={item.handler}
            value={item.value}
            isError={item.errorCondition}
            children={item.children}
          />
        ))}

        <ModalCheckbox value={isRemember} changeHandler={setIsRemember}>
          Remember me
        </ModalCheckbox>
        <Button
          submitHandler={loginHandler}
          type="button"
          children={fillingSubmitButton}
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
