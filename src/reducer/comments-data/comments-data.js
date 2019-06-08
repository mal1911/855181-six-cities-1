import {transformCommentsForLoading} from "../../transform-data";

const initialState = {
  commentsData: [],
  isCommentsLoading: true,
  commentsError: null,
};

const ActionType = {
  LOADED_COMMENTS_DATA: `LOADED_COMMENTS_DATA`,
  CHANGE_COMMENTS_LOAD_STATUS: `CHANGE_COMMENTS_LOAD_STATUS`,
  CHANGE_COMMENTS_ERROR_STATUS: `CHANGE_COMMENTS_ERROR_STATUS`,
};

const ActionCreator = {
  loadedCommentsData: (data) => {
    return {
      type: ActionType.LOADED_COMMENTS_DATA,
      payload: data,
    };
  },
  changeCommentsLoadStatus: (status) => ({
    type: ActionType.CHANGE_COMMENTS_LOAD_STATUS,
    payload: status,
  }),
  changeCommentsErrorStatus: (error) => ({
    type: ActionType.CHANGE_COMMENTS_ERROR_STATUS,
    payload: error,
  }),
};

const successCommentsLoading = (dispatch, data) => {
  data.map((obj) => transformCommentsForLoading(obj));
  dispatch(ActionCreator.loadedCommentsData(data));
  dispatch(ActionCreator.changeCommentsLoadStatus(false));
};

const errorCommentsLoading = (dispatch, err) => {
  dispatch(ActionCreator.changeCommentsErrorStatus(err));
  dispatch(ActionCreator.changeCommentsLoadStatus(false));
};

const Operation = {
  loadCommentsData: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        successCommentsLoading(dispatch, response.data);
      })
      .catch((err) => {
        errorCommentsLoading(dispatch, err);
      });
  },

  saveCommentObj: (id, commentObj) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.changeCommentsLoadStatus(true));

    return api.post(`/comments/${id}`, commentObj)
      .then((response) => {
        successCommentsLoading(dispatch, response.data);
      })
      .catch((err) => {
        errorCommentsLoading(dispatch, err);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOADED_COMMENTS_DATA:
      return Object.assign({}, state, {
        commentsData: action.payload,
      });
    case ActionType.CHANGE_COMMENTS_LOAD_STATUS:
      return Object.assign({}, state, {
        isCommentsLoading: action.payload
      });
    case ActionType.CHANGE_COMMENTS_ERROR_STATUS:
      return Object.assign({}, state, {
        commentsError: action.payload
      });
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
