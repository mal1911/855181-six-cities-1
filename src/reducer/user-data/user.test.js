import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType} from "./user-data";
import {HTML_STATUS} from "../../constants";

describe(`Reducer user works correctly`, () => {
  it(`User authorization testing OK`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.checkLogin();

    apiMock
      .onGet(`/login`)
      .reply(HTML_STATUS.OK, {data: true});

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_USER_LOAD_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.USER_LOGIN,
          payload: {},
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_USER_LOAD_STATUS,
          payload: false,
        });
      });
  });

  it(`User authorization testing FORBIDDEN`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.checkLogin();

    apiMock
      .onGet(`/login`)
      .reply(HTML_STATUS.FORBIDDEN, {data: true});

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_USER_LOAD_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_USER_LOAD_STATUS,
          payload: false,
        });
      });
  });

  it(`User login testing OK`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.userLogin({email: `Oliver.conner@gmail.com`, password: ``}, null);
    apiMock
      .onPost(`/login`)
      .reply(HTML_STATUS.OK, {data: true});

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(6);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_USER_LOAD_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.USER_LOGIN,
          payload: {},
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: false,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_USER_LOAD_STATUS,
          payload: false,
        });
      });
  });

});
