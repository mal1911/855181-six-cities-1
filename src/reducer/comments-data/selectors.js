import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.COMMENTS_DATA;

export const getCommentsData = (state) => {
  return state[NAME_SPACE].commentsData.sort((a, b) => a.date < b.date);
};

export const getCommentsLoadStatus = (state) => {
  return state[NAME_SPACE].isCommentsLoading;
};

export const getCommentsError = (state) => {
  return state[NAME_SPACE].commentsError;
};
