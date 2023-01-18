import {commentsSlice} from "store/comments/comments-slice";

export const {
  getCommentsRejected,
  getCommentsPending,
  getCommentsTrigger,
  getCommentsFulfilled,
  addCommentTrigger,
  addCommentPending,
  addCommentFulfilled,
  addCommentRejected,
  removeCommentTrigger,
  removeCommentFulfilled,
  removeCommentRejected,
  removeCommentPending
} = commentsSlice.actions