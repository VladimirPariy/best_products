import { setVisibilitySignUpModal } from "store/modals/modals-actions";
import { selectSignUpModal } from "store/modals/modals-selectors";
import React, { FC, useEffect, useState } from "react";

import { IRegistrationData } from "lib/interfaces/user-interfaces/registration-data";
import { userInfoTrigger, userTokenTrigger } from "store/user/user-actions";
import { selectAuth, selectToken } from "store/user/user-selector";
import { useAppDispatch, useAppSelector } from "store/store-types";

import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";
import Button from "components/ui/button/button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import Input from "components/ui/input/input";
import Title from "components/ui/title/title";

const RegistrationModal: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const token = useAppSelector(selectToken);

  const isShowSignUpModal = useAppSelector(selectSignUpModal);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isGetUpdate, setIsGetUpdates] = useState<boolean>(false);

  const registrationHandler = async () => {
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
    // обработка ошибки на некорректный пароль (не одинаковый)
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
      />
      <Input
        value={lastName}
        changeHandler={(e) => setLastName(e.target.value)}
        labelText="Last name"
      />
      <Input
        value={email}
        changeHandler={(e) => setEmail(e.target.value)}
        labelText="Email address"
      />
      <Input
        value={password}
        changeHandler={(e) => setPassword(e.target.value)}
        labelText="Password"
        type="password"
      >
        Password must contain at least five characters. A strong password
        contains a combination of letters, numbers and symbols.
      </Input>
      <Input
        value={confirmPassword}
        changeHandler={(e) => setConfirmPassword(e.target.value)}
        labelText="Confirm password"
        type="password"
      />
      <ModalCheckbox value={isGetUpdate} changeHandler={setIsGetUpdates}>
        Get updates on our shop news and promotions
      </ModalCheckbox>

      <Button
        submitHandler={registrationHandler}
        isPurpleButton={true}
        type="button"
        children="Create account"
      />
    </ModalWrapper>
  );
};

export default RegistrationModal;
