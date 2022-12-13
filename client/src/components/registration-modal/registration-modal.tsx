import ModalButton from "components/ui/modal-button/modal-button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import ModalInput from "components/ui/modal-input/modal-input";
import ModalTitle from "components/ui/modal-title/modal-title";
import AuthApi from "lib/api/auth-api";
import React, {Dispatch, FC, SetStateAction, useState} from "react";

import styles from "components/registration-modal/registration-modal.module.scss";

import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";

interface Props {
  isShowRegistrationModal: boolean;
  setIsShowRegistrationModal: Dispatch<SetStateAction<boolean>>;
}

const RegistrationModal: FC<Props> = (props) => {
  const {isShowRegistrationModal, setIsShowRegistrationModal} = props;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isGetUpdates, setIsGetUpdates] = useState<boolean>(false);





  const fetch = () => {
    if(password === confirmPassword) {
      const data = AuthApi.registration(firstName, lastName, email, password, isGetUpdates)
      console.log(data)
    } else{
      console.log('error confirm password')
    }
  }


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

      <ModalCheckbox value={isGetUpdates} changeHandler={setIsGetUpdates}>
        Get updates on our shop news and promotions
      </ModalCheckbox>

      <ModalButton submitHandler={fetch} isPurpleButton={true} type='submit'>
        Create account
      </ModalButton>

    </ModalWrapper>
  );
};

export default RegistrationModal;
