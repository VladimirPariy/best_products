import React, { ChangeEvent, FC, useEffect, useState } from "react";

import styles from "components/edit-user-modal/edit-user-modal.module.scss";

import { setVisibilityEditUserModal } from "store/modals/modals-actions";
import { selectEditUserModal } from "store/modals/modals-selectors";
import { useAppDispatch, useAppSelector } from "lib/interfaces/store.types";
import {
  selectUser,
  selectUserError,
  selectUserStatus,
} from "store/user/user-selector";
import { clearUserError, userUpdateTrigger } from "store/user/user-actions";

import { getTokenFromStorage } from "lib/utils/token-from-storage";
import { apiUrls } from "lib/enums/api-urls";
import { ValidationMessage } from "lib/enums/validation-message";
import { ErrorValidationInterface } from "lib/interfaces/error-validation.interface";
import { validateEmail } from "lib/utils/validate-email";
import { validateLatinLetter } from "lib/utils/validate-latin-letter";
import { validatePhone } from "lib/utils/validate-phone";

import ErrorContainer from "components/ui/error-container/error-container";
import { Loader } from "components/ui/loader/loader";
import BtnForAddImage from "components/ui/btn-for-add-image/btn-for-add-image";
import Button from "components/ui/button/button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import Input from "components/ui/input/input";
import Title from "components/ui/title/title";
import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";

import defaultPhoto from "assets/icon/header/user.svg";

const EditUserModal: FC = () => {
  const {
    first_name,
    last_name,
    email,
    user_photo,
    is_get_update,
    phone_number,
    user_id: id,
  } = useAppSelector(selectUser);
  const token = getTokenFromStorage();
  const dispatch = useAppDispatch();
  const isShowEditUserModal = useAppSelector(selectEditUserModal);
  const serverError = useAppSelector(selectUserError);

  const isLoading = useAppSelector(selectUserStatus);

  const [firstName, setFirstName] = useState<string>(first_name);
  const [lastName, setLastName] = useState<string>(last_name);
  const [emailAddress, setEmailAddress] = useState<string>(email);
  const [phone, setPhone] = useState<string>(phone_number ? phone_number : "");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [getUpdates, setGetUpdates] = useState<boolean>(!!is_get_update);
  const [previewPhoto, setPreviewPhoto] = useState<string | undefined | null>(
    user_photo
  );
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const [errorFirstName, setErrorFirstName] =
    useState<ErrorValidationInterface>(null);
  const [errorLastName, setErrorLastName] =
    useState<ErrorValidationInterface>(null);
  const [errorEmail, setErrorEmail] = useState<ErrorValidationInterface>(null);
  const [errorPhone, setErrorPhone] = useState<ErrorValidationInterface>(null);
  const [errorPassword, setErrorPassword] =
    useState<ErrorValidationInterface>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] =
    useState<ErrorValidationInterface>(null);

  useEffect(() => {
    if (errorFirstName && firstName?.length > 0) {
      setErrorFirstName(null);
    }
    if (errorLastName && lastName.length > 0) {
      setErrorLastName(null);
    }
    if (errorEmail && emailAddress.length > 0 && validateEmail(emailAddress)) {
      setErrorEmail(null);
    }
    if (
      serverError &&
      (serverError.status === 409 || serverError.status === 400)
    ) {
      dispatch(clearUserError());
    }
    if (errorPassword && (newPassword.length > 4 || newPassword.length === 0)) {
      setErrorPassword(null);
    }
    if (
      errorConfirmPassword &&
      (confirmNewPassword.length > 4 || confirmNewPassword.length === 0)
    ) {
      setErrorConfirmPassword(null);
    }
    if (newPassword && validateLatinLetter(newPassword)) {
      setErrorPassword(null);
    }
    if (errorPhone && (phone.length === 0 || validatePhone(phone))) {
      setErrorPhone(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstName,
    lastName,
    emailAddress,
    phone,
    newPassword,
    confirmNewPassword,
    getUpdates,
    uploadFile,
  ]);

  const updateHandling = () => {
    if (firstName.length === 0) {
      setErrorFirstName(ValidationMessage.required);
    }
    if (lastName.length === 0) {
      setErrorLastName(ValidationMessage.required);
    }
    if (emailAddress.length === 0 || !validateEmail(emailAddress)) {
      setErrorEmail(ValidationMessage.invalidEmail);
    }
    if (
      (newPassword.length > 0 && newPassword.length < 5) ||
      !validateLatinLetter(newPassword)
    ) {
      setErrorPassword(ValidationMessage.invalidPassword);
    }
    if (
      (confirmNewPassword.length > 0 && confirmNewPassword.length < 5) ||
      !validateLatinLetter(confirmNewPassword)
    ) {
      setErrorConfirmPassword(ValidationMessage.invalidPassword);
    }
    if (confirmNewPassword !== newPassword) {
      setErrorConfirmPassword(ValidationMessage.invalidConfirmPassword);
    }
    if (phone.length > 0 && !validatePhone(phone)) {
      setErrorPhone(ValidationMessage.invalidPhone);
    }

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      emailAddress.length === 0 ||
      !validateEmail(emailAddress) ||
      (newPassword.length > 0 && newPassword.length < 5) ||
      !validateLatinLetter(newPassword) ||
      (confirmNewPassword.length > 0 && confirmNewPassword.length < 5) ||
      !validateLatinLetter(confirmNewPassword) ||
      confirmNewPassword !== newPassword ||
      (phone.length > 0 && !validatePhone(phone)) ||
      serverError
    ) {
      return;
    }

    const formData = new FormData();

    if (token) {
      formData.append("token", token);
    }
    if (first_name !== firstName) {
      formData.append("first_name", firstName);
    }
    if (last_name !== lastName) {
      formData.append("last_name", lastName);
    }
    if (email !== emailAddress) {
      formData.append("email", emailAddress);
    }
    if (phone_number !== phone && phone.length > 0) {
      formData.append("phone_number", phone);
    }
    if (is_get_update !== +getUpdates) {
      formData.append("is_get_update", `${+getUpdates}`);
    }
    if (newPassword === confirmNewPassword && newPassword.length >= 5) {
      formData.append("password", newPassword);
    }
    if (previewPhoto && previewPhoto !== user_photo && uploadFile) {
      formData.append("img", uploadFile);
    }
    dispatch(userUpdateTrigger({ formData, id }));
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setUploadFile(file[0]);
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target?.result && !(e.target?.result instanceof ArrayBuffer))
          setPreviewPhoto(e.target?.result);
      };
      if (file[0]) reader.readAsDataURL(file[0]);
    }
  };

  const userImage =
    previewPhoto && previewPhoto !== user_photo
      ? previewPhoto
      : previewPhoto && previewPhoto === user_photo
      ? `${apiUrls.BASE_Image_URL}${user_photo}`
      : defaultPhoto;

  useEffect(() => {
    const tokenInSessionStorage = sessionStorage.getItem("token");
    const tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInSessionStorage && token) {
      sessionStorage.setItem("token", token);
    } else if (tokenInLocalStorage && token) {
      localStorage.setItem("token", token);
    }
  }, [token]);
  return (
    <ModalWrapper
      setVisible={setVisibilityEditUserModal}
      isVisible={isShowEditUserModal}
      isAccModal={true}
    >
      <Title>Account Setting</Title>
      <div className={styles.container}>
        <div className={styles.photoContainer}>
          <img src={userImage} alt="" className={styles.userPhoto} />
          <BtnForAddImage fileHandler={fileHandler}>
            Change Photo
          </BtnForAddImage>
        </div>
        <div className={styles.userInfoContainer}>
          <Input
            labelText="First Name"
            changeHandler={(e) => setFirstName(e.target.value)}
            value={firstName}
            isError={!!errorFirstName}
            children={<ErrorContainer errorText={errorFirstName} />}
          />
          <Input
            labelText="Last Name"
            changeHandler={(e) => setLastName(e.target.value)}
            value={lastName}
            isError={!!errorLastName}
            children={<ErrorContainer errorText={errorLastName} />}
          />
          <Input
            labelText="Email address"
            changeHandler={(e) => setEmailAddress(e.target.value)}
            value={emailAddress}
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
            labelText="Phone"
            changeHandler={(e) => setPhone(e.target.value)}
            value={phone}
            type="tel"
            isError={!!(errorPhone || serverError?.status === 409) && !!phone}
            children={
              !!errorPhone || serverError?.status_message ? (
                <div>
                  {errorPhone ||
                    (serverError &&
                      serverError.status === 409 &&
                      JSON.parse(serverError?.status_message).message)}
                </div>
              ) : undefined
            }
          />
          <Input
            labelText="New password"
            changeHandler={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            isError={
              !!errorPassword ||
              !!(!validateLatinLetter(newPassword) && newPassword)
            }
            children={
              !!(
                errorPassword ||
                (!validateLatinLetter(newPassword) && newPassword)
              ) && (
                <div>{errorPassword || ValidationMessage.onlyLatinLetter}</div>
              )
            }
          />
          <Input
            labelText="Confirm new password"
            changeHandler={(e) => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword}
            isError={
              !!errorConfirmPassword ||
              !!(!validateLatinLetter(confirmNewPassword) && confirmNewPassword)
            }
            children={
              !!(
                errorConfirmPassword ||
                (!validateLatinLetter(confirmNewPassword) && confirmNewPassword)
              ) ? (
                <div>
                  {errorConfirmPassword || ValidationMessage.onlyLatinLetter}
                </div>
              ) : undefined
            }
          />
          <ModalCheckbox value={getUpdates} changeHandler={setGetUpdates}>
            Get updates on our shop news and promotions
          </ModalCheckbox>
          <Button
            submitHandler={updateHandling}
            type="button"
            children={isLoading ? <Loader size={23} /> : "Save All Changes"}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditUserModal;
