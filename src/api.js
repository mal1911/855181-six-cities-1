import axios from 'axios';
import {ActionCreator} from './reducer/user/user';
import {BASE_URL, TIMEOUT, HTML_STATUS} from './constants';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.response.status === HTML_STATUS.FORBIDDEN) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
