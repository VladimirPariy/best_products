import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import styles from "components/user-acc-modal/user-acc-modal.module.scss";

import {getTokenFromStorage} from "lib/utils/token-from-storage";
import {useAppDispatch, useAppSelector} from "lib/store/store-types";
import {selectUser} from "lib/store/user/user-selector";
import {userUpdateTrigger} from "lib/store/user/user-actions";
import {apiUrls} from "lib/enums/api-urls";

import BtnForAddImage from "components/ui/btn-for-add-image/btn-for-add-image";
import Button from "components/ui/button/button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import Input from "components/ui/input/input";
import Title from "components/ui/title/title";
import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";

import defaultPhoto from "assets/icon/header/user.svg";

interface Props {
  isShowAccountModal: boolean;
  setIsShowAccountModal: Dispatch<SetStateAction<boolean>>;
}

const UserAccModal: FC<Props> = ({
                                   isShowAccountModal,
                                   setIsShowAccountModal,
                                 }) => {
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

  const updateHandling = () => {
    const formData = new FormData();

    if (token) {
      formData.append("token", token)
    }
    if (first_name !== firstName) {
      formData.append("first_name", firstName)
    }
    if (last_name !== lastName) {
      formData.append("last_name", lastName)
    }
    if (email !== emailAddress) {
      formData.append("email", emailAddress)
    }
    if (phone_number !== phone && phone.length > 0) {
      formData.append("phone_number", phone)
    }
    if (is_get_update !== +getUpdates) {
      formData.append("is_get_update", `${+getUpdates}`)
    }
    if (newPassword === confirmNewPassword && newPassword.length >= 5) {
      formData.append("password", newPassword)
    }
    if (previewPhoto && previewPhoto !== user_photo && uploadFile) {
      formData.append("img", uploadFile)
    }

    dispatch(userUpdateTrigger({formData, id}));
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

  let userImage;
  if (previewPhoto && previewPhoto !== user_photo) {
    userImage = previewPhoto;
  } else if (previewPhoto && previewPhoto === user_photo) {
    userImage = `${apiUrls.BASE_Image_URL}${user_photo}`;
  } else {
    userImage = defaultPhoto;
  }

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
      setVisible={setIsShowAccountModal}
      isVisible={isShowAccountModal}
      isAccModal={true}
    >
      <Title>Account Setting</Title>
      <div className={styles.container}>
        <div className={styles.photoContainer}>
          <img src={userImage} alt="" className={styles.userPhoto}/>
          <BtnForAddImage fileHandler={fileHandler}>Change Photo</BtnForAddImage>
        </div>
        <div className={styles.userInfoContainer}>
          <Input
            labelText="First Name"
            changeHandler={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <Input
            labelText="Last Name"
            changeHandler={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <Input
            labelText="Email address"
            changeHandler={(e) => setEmailAddress(e.target.value)}
            value={emailAddress}
          />
          <Input
            labelText="Phone"
            changeHandler={(e) => setPhone(e.target.value)}
            value={phone}
            type="tel"
          />
          <Input
            labelText="New password"
            changeHandler={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
          <Input
            labelText="Confirm new password"
            changeHandler={(e) => setConfirmNewPassword(e.target.value)}
            value={confirmNewPassword}
          />
          <ModalCheckbox value={getUpdates} changeHandler={setGetUpdates}>
            Get updates on our shop news and promotions
          </ModalCheckbox>
          <Button
            submitHandler={updateHandling}
            type="button"
            children="Save All Changes"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UserAccModal;
