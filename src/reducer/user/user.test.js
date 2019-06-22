import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType, ActionCreator, reducer} from "./user";
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

describe(`Test action creator User`, () => {
  it(`requireAuthorization`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    });
  });
  it(`userLogin`, () => {
    expect(ActionCreator.userLogin({})).toEqual({
      type: ActionType.USER_LOGIN,
      payload: {},
    });
  });
  it(`changeUserLoadStatus`, () => {
    expect(ActionCreator.changeUserLoadStatus(false)).toEqual({
      type: ActionType.CHANGE_USER_LOAD_STATUS,
      payload: false,
    });
  });
  it(`changeUserErrorStatus`, () => {
    expect(ActionCreator.changeUserErrorStatus(null)).toEqual({
      type: ActionType.CHANGE_USER_ERROR_STATUS,
      payload: null,
    });
  });
});

describe(`Test reducer User`, () => {
  it(`REQUIRED_AUTHORIZATION`, () => {
    expect(reducer({isAuthorizationRequired: false}, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: false
    })).toEqual({isAuthorizationRequired: false});
  });
  it(`USER_LOGIN`, () => {
    expect(reducer({userObj: {}}, {
      type: ActionType.USER_LOGIN,
      payload: {}
    })).toEqual({userObj: {}});
  });
  it(`CHANGE_USER_LOAD_STATUS`, () => {
    expect(reducer({isUserLoading: false}, {
      type: ActionType.CHANGE_USER_LOAD_STATUS,
      payload: false
    })).toEqual({isUserLoading: false});
  });
  it(`CHANGE_USER_ERROR_STATUS`, () => {
    expect(reducer({userError: null}, {
      type: ActionType.CHANGE_USER_ERROR_STATUS,
      payload: null
    })).toEqual({userError: null});
  });
});

