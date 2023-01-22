import React, { FC } from "react";

import defaultUserImg from "assets/icon/header/user.svg";
import styles from "components/product-detail/product-detail-tabs/components/comments-tab/components/comments-list.module.scss";

import { apiUrls } from "lib/enums/api-urls";
import { IShotCommentsWithUser } from "lib/interfaces/comments/comments.interface";
import { IUser } from "lib/interfaces/user/user.interface";
import { getDate } from "lib/utils/get-date";
import { getTime } from "lib/utils/get-time";
import { getClassNameByCondition } from "lib/utils/get-class-by-condition";

import { useAppDispatch, useAppSelector } from "store/store-types";
import { removeCommentTrigger } from "store/comments/comments-actions";
import { selectComments } from "store/comments/comments-selectors";

import Button from "components/ui/button/button";

interface Props {
  sort: boolean;
  user: IUser;
}

const CommentsList: FC<Props> = ({ sort, user }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  const dupComments = [...comments];
  const sortedComments = (array: IShotCommentsWithUser[], order: boolean) => {
    if (order) {
      return array.sort((a, b) =>
        new Date(a.updated_at) > new Date(b.updated_at) ? 1 : -1
      );
    } else {
      return array.sort((a, b) =>
        new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1
      );
    }
  };
  const removeComment = (id: number) => {
    dispatch(removeCommentTrigger(id));
  };
  return (
    <>
      {sortedComments(dupComments, sort).map((item) => (
        <div
          key={item.comment_id}
          className={getClassNameByCondition(
            styles,
            "msgContainer",
            "userMsgContainer",
            item.users.user_id === user?.user_id
          )}
        >
          <div className={styles.msgInfo}>
            <img
              src={
                item.users.user_photo
                  ? `${apiUrls.BASE_Image_URL}${item.users.user_photo}`
                  : defaultUserImg
              }
              alt="profile"
              className={styles.msgAuthorPhoto}
            />
            <span className={styles.msgAuthor}>
              {item.users.user_id === user?.user_id
                ? "You"
                : item.users.first_name}
            </span>
            <span className={styles.msgDate}>{getDate(item.updated_at)}</span>
            <span className={styles.msgTime}>{getTime(item.updated_at)}</span>
          </div>
          <div className={styles.msgBody}>{item.comment_msg}</div>
          {user.users_roles?.role_title === "admin" && (
            <Button submitHandler={() => removeComment(item.comment_id)}>
              Delete comment
            </Button>
          )}
        </div>
      ))}
    </>
  );
};

export default CommentsList;
