import axios from 'axios';
import {BASE_URL, TIMEOUT} from './constants';
import {HTML_STATUS} from "./constants";

export const createAPI = () => {
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
      throw (err.response);
    }
    return err.response;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
