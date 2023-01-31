import React, { FC, useEffect, useState } from "react";

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

  return (
    <ModalWrapper
      setVisible={setVisibilitySignUpModal}
      isVisible={isShowSignUpModal}
    >
      <Title>SIGN UP</Title>

      <Input
        value={firstName}
        changeHandler={(e) => setFirstName(e.target.value)}
        labelText="First name"
        isError={!!errorFirstName}
        children={<ErrorContainer errorText={errorFirstName} />}
      />
      <Input
        value={lastName}
        changeHandler={(e) => setLastName(e.target.value)}
        labelText="Last name"
        isError={!!errorLastName}
        children={<ErrorContainer errorText={errorLastName} />}
      />
      <Input
        value={email}
        changeHandler={(e) => setEmail(e.target.value)}
        labelText="Email address"
        isError={!!errorEmail || serverError?.status === 409}
        children={
          !!errorEmail || serverError?.status_message ? (
            <div>
              {errorEmail ||
                (serverError &&
                  serverError.status === 409 &&
                  JSON.parse(serverError?.status_message).message)}
            </div>
          ) : undefined
        }
      />
      <Input
        value={password}
        changeHandler={(e) => setPassword(e.target.value)}
        labelText="Password"
        type="password"
        isError={
          !!errorPassword || !!(!validateLatinLetter(password) && password)
        }
      >
        <>
          Password must contain at least five characters. A strong password
          contains a combination of letters, numbers and symbols.
          {!!(
            errorPassword ||
            (!validateLatinLetter(password) && password)
          ) && <div>{errorPassword || ValidationMessage.onlyLatinLetter}</div>}
        </>
      </Input>
      <Input
        value={confirmPassword}
        changeHandler={(e) => setConfirmPassword(e.target.value)}
        labelText="Confirm password"
        type="password"
        isError={
          !!errorConfirmPassword ||
          !!(!validateLatinLetter(confirmPassword) && confirmPassword)
        }
        children={
          !!(
            errorConfirmPassword ||
            (!validateLatinLetter(confirmPassword) && confirmPassword)
          ) ? (
            <div>
              {errorConfirmPassword || ValidationMessage.onlyLatinLetter}
            </div>
          ) : undefined
        }
      />
      <ModalCheckbox value={isGetUpdate} changeHandler={setIsGetUpdates}>
        Get updates on our shop news and promotions
      </ModalCheckbox>

      <Button
        submitHandler={registrationHandler}
        isPurpleButton={true}
        type="button"
        children={isLoading ? <Loader size={27} /> : "Create account"}
      />
    </ModalWrapper>
  );
};

export default SignUpModal;
