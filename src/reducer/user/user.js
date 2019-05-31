const initialState = {
  isAuthorizationRequired: true,
  userObj: null
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  USER_LOGIN: `USER_LOGIN`,
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
  }
  return state;
};

export {
  ActionCreator,
  ActionType,
  reducer,
};
