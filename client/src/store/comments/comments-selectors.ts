import {RootState} from "store/store-types";

const selectComments = (state:RootState) => state.comments.entities;
const selectCommentsStatus = (state:RootState) => state.comments.status;
const selectCommentsError = (state:RootState) => state.comments.error;

export {selectComments, selectCommentsStatus, selectCommentsError}