import {createSelector} from "reselect";
import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getUserObj = (state) => {
  return state[NAME_SPACE].userObj;
};

export const getUserLoadStatus = (state) => {
  return state[NAME_SPACE].isUserLoading;
};

export const getUserError = (state) => {
  return state[NAME_SPACE].userError;
};

export const getUserInfo = createSelector(
    getUserObj,
    (userObj) => {
      return userObj ? {email: userObj.email, avatarUrl: userObj.avatarUrl} : null;
    }
);
