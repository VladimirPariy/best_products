import React, {Dispatch, FC, SetStateAction, useState} from "react";

import styles from "components/user-acc-modal/user-acc-modal.module.scss";

import {useAppSelector} from "lib/store/store-types";
import {selectUser} from "lib/store/user-auth/user-auth-selector";

import ModalButton from "components/ui/modal-button/modal-button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import ModalInput from "components/ui/modal-input/modal-input";
import ModalTitle from "components/ui/modal-title/modal-title";
import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";

import defaultFoto from "assets/icon/header/user2.svg"

interface Props {
  isShowAccountModal: boolean;
  setIsShowAccountModal: Dispatch<SetStateAction<boolean>>;
}

const UserAccModal: FC<Props> = ({isShowAccountModal, setIsShowAccountModal}) => {
  const {first_name, last_name, email, user_photo, is_get_update, phone_number} = useAppSelector(selectUser);

  const [firstName, setFirstName] = useState<string>(first_name);
  const [lastName, setLastName] = useState<string>(last_name);
  const [emailAddress, setEmailAddress] = useState<string>(email);
  const [phone, setPhone] = useState<string>(phone_number ? phone_number : '');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [getUpdates, setGetUpdates] = useState<boolean>(!!is_get_update);


  const clientFoto = user_photo ? user_photo : defaultFoto
  return (
    <ModalWrapper setVisible={setIsShowAccountModal} isVisible={isShowAccountModal} isAccModal={true}>
      <ModalTitle>
        Account Setting
      </ModalTitle>
      <div className={styles.container}>
        <div className={styles.photoContainer}>
          <img src={clientFoto} alt="" className={styles.userPhoto}/>
          <ModalButton isPurpleButton={false} submitHandler={() => {
          }}>
            Change Foto
          </ModalButton>
        </div>
        <div className={styles.userInfoContainer}>
          <ModalInput labelText='First Name' changeHandler={setFirstName} value={firstName}/>
          <ModalInput labelText='Last Name' changeHandler={setLastName} value={lastName}/>
          <ModalInput labelText='Email address' changeHandler={setEmailAddress} value={emailAddress}/>
          <ModalInput labelText='Phone' changeHandler={setPhone} value={phone}/>
          <ModalInput labelText='New password' changeHandler={setNewPassword} value={newPassword}/>
          <ModalInput labelText='Confirm new password' changeHandler={setConfirmNewPassword} value={confirmNewPassword}/>
          <ModalCheckbox value={getUpdates} changeHandler={setGetUpdates}>Get updates on our shop news and promotions</ModalCheckbox>
          <ModalButton submitHandler={() => {
          }}>
            Save All Changes
          </ModalButton>
        </div>
      </div>


    </ModalWrapper>
  );
};

export default UserAccModal;