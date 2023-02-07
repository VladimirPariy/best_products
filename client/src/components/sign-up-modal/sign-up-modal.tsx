import React, { ChangeEvent, FC, useEffect, useState } from "react";

import { validateLatinLetter } from "lib/utils/validate-latin-letter";
import { ValidationMessage } from "lib/enums/validation-message";
import { validateEmail } from "lib/utils/validate-email";
import { IRegistrationData } from "lib/interfaces/user/registration-data.interface";
import { ErrorValidationInterface } from "lib/interfaces/error-validation.interface";

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
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
import { setVisibilitySignUpModal } from "store/modals/modals-actions";
import { selectSignUpModal } from "store/modals/modals-selectors";

import ErrorContainer from "components/ui/error-container/error-container";
import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";
import Button from "components/ui/button/button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import Input from "components/ui/input/input";
import Title from "components/ui/title/title";
import { Loader } from "components/ui/loader/loader";

const SignUpModal: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const token = useAppSelector(selectToken);

  const isShowSignUpModal = useAppSelector(selectSignUpModal);

  const serverError = useAppSelector(selectUserError);
  const isLoading = useAppSelector(selectUserStatus);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isGetUpdate, setIsGetUpdates] = useState<boolean>(false);

  const [errorFirstName, setErrorFirstName] =
    useState<ErrorValidationInterface>(null);
  const [errorLastName, setErrorLastName] =
    useState<ErrorValidationInterface>(null);
  const [errorEmail, setErrorEmail] = useState<ErrorValidationInterface>(null);
  const [errorPassword, setErrorPassword] =
    useState<ErrorValidationInterface>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] =
    useState<ErrorValidationInterface>(null);

  useEffect(() => {
    if (errorFirstName && firstName?.length > 0) setErrorFirstName(null);
    if (errorLastName && lastName.length > 0) setErrorLastName(null);
    if (errorEmail && email.length > 0 && validateEmail(email))
      setErrorEmail(null);
    if (serverError && serverError.status === 409) dispatch(clearUser());
    if (errorPassword && password.length > 4) setErrorPassword(null);
    if (errorConfirmPassword && confirmPassword.length > 4)
      setErrorConfirmPassword(null);
    if (password && validateLatinLetter(password)) setErrorPassword(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, password, confirmPassword]);

  const registrationHandler = async () => {
    if (firstName.length === 0) {
      setErrorFirstName(ValidationMessage.required);
    }
    if (lastName.length === 0) {
      setErrorLastName(ValidationMessage.required);
    }
    if (email.length === 0 || !validateEmail(email)) {
      setErrorEmail(ValidationMessage.invalidEmail);
    }
    if (password.length < 5 || !validateLatinLetter(password)) {
      setErrorPassword(ValidationMessage.invalidPassword);
    }
    if (confirmPassword.length < 5 || !validateLatinLetter(confirmPassword)) {
      setErrorConfirmPassword(ValidationMessage.invalidPassword);
    }
    if (confirmPassword !== password) {
      setErrorConfirmPassword(ValidationMessage.invalidConfirmPassword);
    }

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      !validateEmail(email) ||
      password.length < 5 ||
      !validateLatinLetter(password) ||
      confirmPassword.length < 5 ||
      !validateLatinLetter(confirmPassword) ||
      confirmPassword !== password ||
      serverError
    )
      return;

    if (password === confirmPassword) {
      dispatch(
        userTokenTrigger(
          new IRegistrationData({
            firstName,
            lastName,
            email,
            password,
            isGetUpdate,
          })
        )
      );
      return;
    }
  };

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      dispatch(userInfoTrigger(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    auth && dispatch(setVisibilitySignUpModal(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const firstNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const fillingSubmitHandler = isLoading ? (
    <Loader size={27} />
  ) : (
    "Create account"
  );

  const fillingConfirmPassword = !!(
    errorConfirmPassword ||
    (!validateLatinLetter(confirmPassword) && confirmPassword)
  ) ? (
    <div>{errorConfirmPassword || ValidationMessage.onlyLatinLetter}</div>
  ) : undefined;

  const confirmPasswordErrorCondition =
    !!errorConfirmPassword ||
    !!(!validateLatinLetter(confirmPassword) && confirmPassword);

  const passwordErrorCondition =
    !!errorPassword || !!(!validateLatinLetter(password) && password);

  const fillingEmail =
    !!errorEmail || serverError?.status_message ? (
      <div>
        {errorEmail ||
          (serverError &&
            serverError.status === 409 &&
            JSON.parse(serverError?.status_message).message)}
      </div>
    ) : undefined;

  const fillingPassword = (
    <>
      Password must contain at least five characters. A strong password contains
      a combination of letters, numbers and symbols.
      {!!(errorPassword || (!validateLatinLetter(password) && password)) && (
        <div>{errorPassword || ValidationMessage.onlyLatinLetter}</div>
      )}
    </>
  );

  const emailErrorCondition = !!errorEmail || serverError?.status === 409;

  const inputs = [
    {
      value: firstName,
      handler: firstNameHandler,
      label: "First name",
      errorCondition: !!errorFirstName,
      children: <ErrorContainer errorText={errorFirstName} />,
      type: "text",
    },
    {
      value: lastName,
      handler: lastNameHandler,
      label: "Last name",
      errorCondition: !!errorLastName,
      children: <ErrorContainer errorText={errorLastName} />,
      type: "text",
    },
    {
      value: email,
      handler: emailHandler,
      label: "Email address",
      errorCondition: emailErrorCondition,
      children: fillingEmail,
      type: "text",
    },
    {
      value: password,
      handler: passwordHandler,
      label: "Password",
      errorCondition: passwordErrorCondition,
      children: fillingPassword,
      type: "password",
    },
    {
      value: confirmPassword,
      handler: confirmPasswordHandler,
      label: "Confirm password",
      errorCondition: confirmPasswordErrorCondition,
      children: fillingConfirmPassword,
      type: "password",
    },
  ];
  return (
    <ModalWrapper
      setVisible={setVisibilitySignUpModal}
      isVisible={isShowSignUpModal}
    >
      <Title>SIGN UP</Title>
      {inputs.map((item, index) => (
        <Input
          key={index}
          value={item.value}
          changeHandler={item.handler}
          labelText={item.label}
          type={item.type}
          isError={item.errorCondition}
          children={item.children}
        />
      ))}
      <ModalCheckbox value={isGetUpdate} changeHandler={setIsGetUpdates}>
        Get updates on our shop news and promotions
      </ModalCheckbox>
      <Button
        submitHandler={registrationHandler}
        isPurpleButton={true}
        type="button"
        children={fillingSubmitHandler}
      />
    </ModalWrapper>
  );
};

export default SignUpModal;
