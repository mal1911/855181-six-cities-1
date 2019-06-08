import axios from 'axios';
import {BASE_URL, TIMEOUT, HTML_STATUS} from './constants';

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    if (err.status === HTML_STATUS.FORBIDDEN) {
      onLoginFail();
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
