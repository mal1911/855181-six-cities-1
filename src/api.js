import axios from 'axios';
import {BASE_URL, TIMEOUT} from './constants';

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
    throw (err);
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
