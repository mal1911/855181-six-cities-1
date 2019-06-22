import {transformUserForLoading} from "../../transform-data";
import {HTML_STATUS} from "../../constants";

const initialState = {
  isAuthorizationRequired: true,
  userObj: null,
  isUserLoading: true,
  userError: null,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  USER_LOGIN: `USER_LOGIN`,
  CHANGE_USER_LOAD_STATUS: `CHANGE_USER_LOAD_STATUS`,
  CHANGE_USER_ERROR_STATUS: `CHANGE_USER_ERROR_STATUS`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  userLogin: (userObj) => {
    return {
      type: ActionType.USER_LOGIN,
      payload: userObj,
    };
  },

  changeUserLoadStatus: (status) => ({
    type: ActionType.CHANGE_USER_LOAD_STATUS,
    payload: status,
  }),

  changeUserErrorStatus: (status) => ({
    type: ActionType.CHANGE_USER_ERROR_STATUS,
    payload: status,
  }),
};

const afterSuccess = (dispatch, data) => {
  dispatch(ActionCreator.userLogin(transformUserForLoading(data)));
  dispatch(ActionCreator.requireAuthorization(false));
  dispatch(ActionCreator.changeUserLoadStatus(false));
};

const afterError = (dispatch, err) => {
  dispatch(ActionCreator.changeUserErrorStatus(err));
  dispatch(ActionCreator.changeUserLoadStatus(false));
};

const Operation = {
  checkLogin: () => (dispatch, _getState, api) => {
    dispatch(ActionCreator.changeUserLoadStatus(true));
    return api.get(`/login`)
      .then((response) => {
        if (response.status === HTML_STATUS.OK) {
          afterSuccess(dispatch, response.data);
        }
      })
      .catch((err) => {
        afterError(dispatch, err);
      });
  },
  userLogin: (autorizationObj, onGoLogin) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.changeUserLoadStatus(true));
    return api.post(`/login`, autorizationObj)
      .then((response) => {
        if (response.status === HTML_STATUS.OK) {
          afterSuccess(dispatch, response.data);
          onGoLogin();
        }
      })
      .catch((err) => {
        afterError(dispatch, err);
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
    case ActionType.USER_LOGIN: {
      return Object.assign({}, state, {
        userObj: action.payload,
      });
    }
    case ActionType.CHANGE_USER_LOAD_STATUS: {
      return Object.assign({}, state, {
        isUserLoading: action.payload
      });
    }
    case ActionType.CHANGE_USER_ERROR_STATUS: {
      return Object.assign({}, state, {
        userError: action.payload
      });
    }
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
