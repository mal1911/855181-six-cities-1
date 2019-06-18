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
  USER_LOGOUT: `USER_LOGOUT`,
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

  changeUserErrorStatus: (error) => ({
    type: ActionType.CHANGE_USER_ERROR_STATUS,
    payload: error,
  }),
};

const Operation = {
  checkLogin: () => (dispatch, _getState, api) => {
    dispatch(ActionCreator.changeUserLoadStatus(true));
    return api.get(`/login`)
      .then((response) => {
        if (response.status === HTML_STATUS.OK) {
          dispatch(ActionCreator.userLogin(transformUserForLoading(response.data)));
          dispatch(ActionCreator.requireAuthorization(false));
        }
      })
      .catch((err) => {
        dispatch(ActionCreator.changeUserErrorStatus(err));
      })
      .finally(() => {
        dispatch(ActionCreator.changeUserLoadStatus(false));
      });
  },
  userLogin: (autorizationObj, history) => (dispatch, _getState, api) => {
    dispatch(ActionCreator.changeUserLoadStatus(true));
    return api.post(`/login`, autorizationObj)
      .then((response) => {
        if (response.status === HTML_STATUS.OK) {
          dispatch(ActionCreator.userLogin(transformUserForLoading(response.data)));
          dispatch(ActionCreator.requireAuthorization(false));
          history.push(`/`);
        }
      })
      .catch((err) => {
        dispatch(ActionCreator.changeUserErrorStatus(err));
      })
      .finally(() => {
        dispatch(ActionCreator.changeUserLoadStatus(false));
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
