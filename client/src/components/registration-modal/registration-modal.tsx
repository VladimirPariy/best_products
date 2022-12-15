import {
  selectAuth,
} from "lib/store/user-auth/user-auth-selector";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import {userRegistrationTrigger} from "lib/store/user-auth/user-auth-actions";
import {useAppDispatch, useAppSelector} from "lib/store/store-types";

import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";
import ModalButton from "components/ui/modal-button/modal-button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import ModalInput from "components/ui/modal-input/modal-input";
import ModalTitle from "components/ui/modal-title/modal-title";

interface Props {
  isShowRegistrationModal: boolean;
  setIsShowRegistrationModal: Dispatch<SetStateAction<boolean>>;
}

const RegistrationModal: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const {isShowRegistrationModal, setIsShowRegistrationModal} = props;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isGetUpdate, setIsGetUpdates] = useState<boolean>(false);

  const [passwordError, setPasswordError] = useState(false);

  const registrationHandler = () => {
    if (password === confirmPassword) {
      dispatch(
        userRegistrationTrigger({
          firstName,
          lastName,
          email,
          password,
          isGetUpdate,
        })
      );
      return;
    }
    // обработка ошибки на некорректный пароль (не одинаковый)
  };

  useEffect(() => {
    auth && setIsShowRegistrationModal(false);
  }, [auth]);

  return (
    <ModalWrapper
      setVisible={setIsShowRegistrationModal}
      isVisible={isShowRegistrationModal}
    >
      <ModalTitle>SIGN UP</ModalTitle>

      <ModalInput
        value={firstName}
        changeHandler={setFirstName}
        labelText="First name"
      />
      <ModalInput
        value={lastName}
        changeHandler={setLastName}
        labelText="Last name"
      />
      <ModalInput
        value={email}
        changeHandler={setEmail}
        labelText="Email address"
      />
      <ModalInput
        value={password}
        changeHandler={setPassword}
        labelText="Password"
        type="password"
      >
        Password must contain at least five characters. A strong password
        contains a combination of letters, numbers and symbols.
      </ModalInput>
      <ModalInput
        value={confirmPassword}
        changeHandler={setConfirmPassword}
        labelText="Confirm password"
        type="password"
      />
      <ModalCheckbox value={isGetUpdate} changeHandler={setIsGetUpdates}>
        Get updates on our shop news and promotions
      </ModalCheckbox>

      <ModalButton
        submitHandler={registrationHandler}
        isPurpleButton={true}
        type="submit"
      >
        Create account
      </ModalButton>
    </ModalWrapper>
  );
};

export default RegistrationModal;
