import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "components/user-acc-modal/user-acc-modal.module.scss";
import cl from "components/ui/modal-button/modal-buttom.module.scss";

import {getTokenFromStorage} from "lib/utils/TokenFromStorage";
import {useAppDispatch, useAppSelector} from "lib/store/store-types";
import {selectToken, selectUser} from "lib/store/user/user-selector";
import {IUserUpdateData} from "lib/interfaces/user-update-data.interface";
import {userUpdateTrigger} from "lib/store/user/user-actions";
import {addTwoClassNames} from "lib/utils/add-two-class-names";
import {ApiUrls} from "lib/enums/api-urls";

import ModalButton from "components/ui/modal-button/modal-button";
import ModalCheckbox from "components/ui/modal-checkbox/modal-checkbox";
import ModalInput from "components/ui/modal-input/modal-input";
import ModalTitle from "components/ui/modal-title/modal-title";
import ModalWrapper from "components/ui/modal-wrapper/modal-wrapper";

import defaultFoto from "assets/icon/header/user.svg";

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
  const token = useAppSelector(selectToken);
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
    let updatingInfo: IUserUpdateData = {id};
    if (token) updatingInfo = {...updatingInfo, token};
    if (first_name !== firstName)
      updatingInfo = {...updatingInfo, first_name: firstName};
    if (last_name !== lastName)
      updatingInfo = {...updatingInfo, last_name: lastName};
    if (email !== emailAddress)
      updatingInfo = {...updatingInfo, email: emailAddress};
    if (phone_number !== phone && phone.length > 0)
      updatingInfo = {...updatingInfo, phone_number: phone};
    if (is_get_update !== +getUpdates)
      updatingInfo = {...updatingInfo, is_get_update: +getUpdates};
    if (newPassword === confirmNewPassword && newPassword.length >= 5)
      updatingInfo = {...updatingInfo, password: newPassword};
    if (previewPhoto && previewPhoto !== user_photo)
      updatingInfo = {...updatingInfo, user_photo: uploadFile};

    dispatch(userUpdateTrigger(updatingInfo));
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    userImage = `${ApiUrls.BASE_Image_URL}${user_photo}`;
  } else {
    userImage = defaultFoto;
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

  const buttonClasses = addTwoClassNames(cl, "button", "whiteButton");
  return (
    <ModalWrapper
      setVisible={setIsShowAccountModal}
      isVisible={isShowAccountModal}
      isAccModal={true}
    >
      <ModalTitle>Account Setting</ModalTitle>
      <div className={styles.container}>
        <div className={styles.photoContainer}>
          <img src={userImage} alt="" className={styles.userPhoto}/>
          <label className={buttonClasses}>
            Change Foto
            <input
              type="file"
              style={{display: "none"}}
              accept="image/*"
              onChange={fileHandler}
            />
          </label>
        </div>
        <div className={styles.userInfoContainer}>
          <ModalInput
            labelText="First Name"
            changeHandler={setFirstName}
            value={firstName}
          />
          <ModalInput
            labelText="Last Name"
            changeHandler={setLastName}
            value={lastName}
          />
          <ModalInput
            labelText="Email address"
            changeHandler={setEmailAddress}
            value={emailAddress}
          />
          <ModalInput
            labelText="Phone"
            changeHandler={setPhone}
            value={phone}
            type="tel"
          />
          <ModalInput
            labelText="New password"
            changeHandler={setNewPassword}
            value={newPassword}
          />
          <ModalInput
            labelText="Confirm new password"
            changeHandler={setConfirmNewPassword}
            value={confirmNewPassword}
          />
          <ModalCheckbox value={getUpdates} changeHandler={setGetUpdates}>
            Get updates on our shop news and promotions
          </ModalCheckbox>
          <ModalButton
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
