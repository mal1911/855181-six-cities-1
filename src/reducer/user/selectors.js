import NameSpace from '../name-spaces';
import {createSelector} from "reselect/lib/index";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getUserObj = (state) => {
  return state[NAME_SPACE].userObj;
};

export const getUserInfo = createSelector(
    getUserObj,
    (userObj) => {
      return userObj ? {email: userObj.email, avatarUrl: userObj.avatarUrl} : null;
    }
);
