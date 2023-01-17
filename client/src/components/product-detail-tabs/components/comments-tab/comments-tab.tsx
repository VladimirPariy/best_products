import Arrow from "assets/icon/general/arrow";
import Arrows from "assets/icon/sort/arrows";
import Button from "components/ui/button/button";
import ErrorContainer from "components/ui/error-container/error-container";
import TextArea from "components/ui/text-area/text-area";
import {ValidationMessage} from "lib/enums/validation-message";
import {ErrorValidationInterface} from "lib/interfaces/error-validation.interface";
import React, {ChangeEvent, FC, useEffect, useState} from "react";

import styles from "components/product-detail-tabs/components/comments-tab/comments-tab.module.scss"
import defaultUserImg from "assets/icon/header/user.svg";

import {getClassNameByCondition} from "lib/utils/get-class-by-condition";
import {apiUrls} from "lib/enums/api-urls";
import {ShotCommentsWithUser} from "lib/interfaces/comments/comments.interface";
import {setVisibilitySignInModal} from "store/modals/modals-actions";
import {useAppDispatch, useAppSelector} from "store/store-types";
import {selectUser} from "store/user/user-selector";
import {getTime} from "lib/utils/get-time";
import {getDate} from "lib/utils/get-date";

interface Props {
  comments: ShotCommentsWithUser[];
}

const CommentsTab: FC<Props> = ({comments}) => {

  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const [canLeaveComment, setCanLeaveComment] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<ErrorValidationInterface>(null)

  useEffect(() => {
    if (Object.keys(user).length) setCanLeaveComment(true)
    else setCanLeaveComment(false)
  }, [user])

  const [sort, setSort] = useState<boolean>(true) //true - asc, false - desc
  const dupComments = [...comments]
  const sortedComments = (array: ShotCommentsWithUser[], order: boolean) => {
    if (order) {
      return array.sort((a, b) => new Date(a.updated_at) > new Date(b.updated_at) ? 1 : -1)
    } else {
      return array.sort((a, b) => new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1)
    }
  }

  const messageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    if (message.length >= 5) setErrorMessage(null)
  }, [message])


  const addComment = () => {
    if (!canLeaveComment) {
      dispatch(setVisibilitySignInModal(true))
      return;
    }
    if (message.length < 5) {
      setErrorMessage(ValidationMessage.invalidComment)
      return
    }

  }

  const arrowClassName = getClassNameByCondition(styles, 'toggleSort', 'descSort', !sort, '')
  return (
    <div className={styles.commentsWrapper}>
      <button
        onClick={() => setSort(prev => !prev)}
        className={styles.commentsSort}
      >
        <span className={styles.arrowsSort}>
        <Arrows/>
        </span>
        <span className={styles.sortTitle}>
         Date
        </span>
        <span className={arrowClassName}>
          <Arrow/>
        </span>
      </button>
      {sortedComments(dupComments, sort).map(item => (
        <div key={item.comment_id} className={getClassNameByCondition(styles, 'msgContainer', 'userMsgContainer', item.users.user_id === user?.user_id)}>
          <div className={styles.msgInfo}>
            <img src={item.users.user_photo ? `${apiUrls.BASE_Image_URL}${item.users.user_photo}` : defaultUserImg} alt="profile" className={styles.msgAuthorPhoto}/>
            <span className={styles.msgAuthor}>{item.users.user_id === user?.user_id ? 'You' : item.users.first_name}</span>
            <span className={styles.msgDate}>{getDate(item.updated_at)}</span>
            <span className={styles.msgTime}>{getTime(item.updated_at)}</span>
          </div>
          <div className={styles.msgBody}>{item.comment_msg}</div>
        </div>
      ))}
      {
        canLeaveComment && <TextArea changeHandler={messageChange} value={message} isError={!!errorMessage} children={<ErrorContainer errorText={errorMessage}/>}/>
      }
      <Button submitHandler={addComment}>
        Write a Review
      </Button>
    </div>
  );
};

export default CommentsTab;