import React, {ChangeEvent, FC, useEffect, useState} from "react";

import {ValidationMessage} from "lib/enums/validation-message";
import {ErrorValidationInterface} from "lib/interfaces/error-validation.interface";

import {addCommentTrigger, getCommentsTrigger} from "store/comments/comments-actions";
import {selectCommentsError, selectCommentsStatus} from "store/comments/comments-selectors";
import {setVisibilitySignInModal} from "store/modals/modals-actions";
import {useAppDispatch, useAppSelector} from "store/store-types";
import {selectUser} from "store/user/user-selector";

import {Loader} from "components/ui/loader/loader";
import AllCommentsWrapper from "components/product-detail-tabs/components/comments-tab/components/all-comments-wrapper";
import CommentsList from "components/product-detail-tabs/components/comments-tab/components/comments-list";
import SortButton from "components/product-detail-tabs/components/comments-tab/components/sort-button";
import Button from "components/ui/button/button";
import ErrorContainer from "components/ui/error-container/error-container";
import TextArea from "components/ui/text-area/text-area";

interface Props {
  product_id: number
}

const CommentsTab: FC<Props> = ({product_id}) => {

  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectCommentsStatus)
  const error = useAppSelector(selectCommentsError)
  const dispatch = useAppDispatch()
  const [canLeaveComment, setCanLeaveComment] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<ErrorValidationInterface>(null)
  const [sort, setSort] = useState<boolean>(true) //true - asc, false - desc

  useEffect(() => {
    dispatch(getCommentsTrigger(product_id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (message.length >= 5 || message.length < 255) setErrorMessage(null)
  }, [message])

  useEffect(() => {
    if (Object.keys(user).length) setCanLeaveComment(true)
    else setCanLeaveComment(false)
  }, [user])


  const messageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const addComment = () => {
    if (!canLeaveComment) {
      dispatch(setVisibilitySignInModal(true))
      return;
    }
    if (message.length < 5 || message.length > 254) {
      setErrorMessage(ValidationMessage.invalidComment)
      return
    }
    dispatch(addCommentTrigger({userId: user.user_id, productId: product_id, message}))
    setMessage('')
  }

  return (
    <AllCommentsWrapper>
      <SortButton sort={sort} setSort={setSort}/>
      <CommentsList sort={sort} user={user}/>
      {isLoading && <Loader color={'#766ed3'}/>}
      {error &&
          <ErrorContainer errorText={'Some error has occurred. Please try again later'} style={{color: "rgba(252, 48, 3, 1)", textAlign: 'center'}}/>
      }
      {canLeaveComment && <TextArea changeHandler={messageChange}
																		value={message}
																		isError={!!errorMessage}
																		children={<ErrorContainer errorText={errorMessage}/>}/>
      }
      <Button submitHandler={addComment}>
        Write a Review
      </Button>
    </AllCommentsWrapper>
  );
};

export default CommentsTab;