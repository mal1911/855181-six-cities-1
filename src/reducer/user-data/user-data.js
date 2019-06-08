import {transformUserForLoading} from "../../transform-data";
import {HTML_STATUS} from "../../constants";

const initialState = {
  isAuthorizationRequired: true,
  userObj: null,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  USER_LOGIN: `USER_LOGIN`,
  USER_LOGOUT: `USER_LOGOUT`,
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
  userLogout: () => {
    return {
      type: ActionType.USER_LOGOUT,
    };
  },
};

const Operation = {
  userLogin: (autorizationObj, history) => (dispatch, _getState, api) => {
    return api.post(`/login`, autorizationObj)
      .then((response) => {
        if (response.status === HTML_STATUS.OK) {
          const data = transformUserForLoading(response.data);
          dispatch(ActionCreator.userLogin(data));
          history.push(`/`);
        }
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
        isAuthorizationRequired: false,
      });
    }
    case ActionType.USER_LOGOUT: {
      return Object.assign({}, state, {
        userObj: {},
        isAuthorizationRequired: true,
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
