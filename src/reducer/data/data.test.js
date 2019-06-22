import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType, ActionCreator, reducer} from "./data";
import {HTML_STATUS} from "../../constants";
import {offersData} from "../../mocks/mocks";

describe(`Reducer works correctly`, () => {
  it(`Testing load offersData`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.loadOffersData();

    apiMock
      .onGet(`/hotels`)
      .reply(HTML_STATUS.OK, []);

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_LOAD_STATUS,
          payload: true,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.CHANGE_OFFERS_ERROR_STATUS,
          payload: null,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_FAVORITES_ERROR_STATUS,
          payload: null,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_OFFERS_DATA,
          payload: [],
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.CHANGE_LOAD_STATUS,
          payload: false,
        });
      });
  });

  it(`Testing load favoritesData`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.loadFavoritesData();

    apiMock
      .onGet(`/favorite`)
      .reply(HTML_STATUS.OK, []);

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_FAVORITES_DATA,
          payload: [],
        });
      });
  });

  it(`Change the status of favorites`, function () {
    const dispatch = jest.fn();
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.changeFavoriteStatus(1, 0, [], [], jest.fn());

    apiMock
      .onPost(`/favorite/${offersData[0].id}/0`)
      .reply(HTML_STATUS.OK, JSON.stringify(offersData[0]));

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(6);

        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.CHANGE_OFFERS_DATA,
          payload: [],
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.CHANGE_FAVORITES_DATA,
          payload: [],
        });
      });
  });

  it(`Testing load commentsData`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.loadCommentsData(1);

    apiMock
      .onGet(`/comments/${offersData[0].id}`)
      .reply(HTML_STATUS.OK, []);

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_COMMENTS_DATA,
          payload: [],
        });
      });
  });

  it(`Testing save commentsData`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.saveCommentObj(1, {rating: 0, comment: ``});

    apiMock
      .onPost(`/comments/${offersData[0].id}`)
      .reply(HTML_STATUS.OK, []);

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.CHANGE_COMMENTS_DATA,
          payload: [],
        });
      });
  });
});

describe(`Test action creator Data`, () => {
  it(`changeLoadStatus`, () => {
    expect(ActionCreator.changeLoadStatus(false)).toEqual({
      type: ActionType.CHANGE_LOAD_STATUS,
      payload: false,
    });
  });
  it(`changeOffersData`, () => {
    expect(ActionCreator.changeOffersData([])).toEqual({
      type: ActionType.CHANGE_OFFERS_DATA,
      payload: [],
    });
  });
  it(`changeFavoritesData`, () => {
    expect(ActionCreator.changeFavoritesData([])).toEqual({
      type: ActionType.CHANGE_FAVORITES_DATA,
      payload: [],
    });
  });
  it(`changeCommentsData`, () => {
    expect(ActionCreator.changeCommentsData([])).toEqual({
      type: ActionType.CHANGE_COMMENTS_DATA,
      payload: [],
    });
  });
  it(`changeActiveCityIndex`, () => {
    expect(ActionCreator.changeActiveCityIndex(0)).toEqual({
      type: ActionType.CHANGE_ACTIVE_CITY_INDEX,
      payload: 0,
    });
  });
  it(`changeActiveOrderIndex`, () => {
    expect(ActionCreator.changeActiveOrderIndex(0)).toEqual({
      type: ActionType.CHANGE_ACTIVE_ORDER_INDEX,
      payload: 0,
    });
  });
  it(`changeActiveOfferId`, () => {
    expect(ActionCreator.changeActiveOfferId(1)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER_ID,
      payload: 1,
    });
  });
  it(`changeOffersErrorStatus`, () => {
    expect(ActionCreator.changeOffersErrorStatus(null)).toEqual({
      type: ActionType.CHANGE_OFFERS_ERROR_STATUS,
      payload: null,
    });
  });
  it(`changeFavoritesErrorStatus`, () => {
    expect(ActionCreator.changeFavoritesErrorStatus(null)).toEqual({
      type: ActionType.CHANGE_FAVORITES_ERROR_STATUS,
      payload: null,
    });
  });
  it(`changeCommentsErrorStatus`, () => {
    expect(ActionCreator.changeCommentsErrorStatus(null)).toEqual({
      type: ActionType.CHANGE_COMMENTS_ERROR_STATUS,
      payload: null,
    });
  });
});

describe(`Test reducer Data`, () => {
  it(`CHANGE_LOAD_STATUS`, () => {
    expect(reducer({isLoading: false}, {
      type: ActionType.CHANGE_LOAD_STATUS,
      payload: false
    })).toEqual({isLoading: false});
  });
  it(`CHANGE_OFFERS_DATA`, () => {
    expect(reducer({offersData: []}, {
      type: ActionType.CHANGE_OFFERS_DATA,
      payload: []
    })).toEqual({offersData: []});
  });
  it(`CHANGE_FAVORITES_DATA`, () => {
    expect(reducer({favoritesData: []}, {
      type: ActionType.CHANGE_FAVORITES_DATA,
      payload: []
    })).toEqual({favoritesData: []});
  });
  it(`CHANGE_COMMENTS_DATA`, () => {
    expect(reducer({commentsData: []}, {
      type: ActionType.CHANGE_COMMENTS_DATA,
      payload: []
    })).toEqual({commentsData: []});
  });
  it(`CHANGE_ACTIVE_CITY_INDEX`, () => {
    expect(reducer({activeCityIndex: 0}, {
      type: ActionType.CHANGE_ACTIVE_CITY_INDEX,
      payload: 0
    })).toEqual({activeCityIndex: 0});
  });
  it(`CHANGE_ACTIVE_ORDER_INDEX`, () => {
    expect(reducer({activeOrderIndex: 0}, {
      type: ActionType.CHANGE_ACTIVE_ORDER_INDEX,
      payload: 0
    })).toEqual({activeOrderIndex: 0});
  });
  it(`CHANGE_ACTIVE_OFFER_ID`, () => {
    expect(reducer({activeOfferId: 1}, {
      type: ActionType.CHANGE_ACTIVE_OFFER_ID,
      payload: 1
    })).toEqual({activeOfferId: 1});
  });
  it(`CHANGE_OFFERS_ERROR_STATUS`, () => {
    expect(reducer({offersError: null}, {
      type: ActionType.CHANGE_OFFERS_ERROR_STATUS,
      payload: null
    })).toEqual({offersError: null});
  });
  it(`CHANGE_FAVORITES_ERROR_STATUS`, () => {
    expect(reducer({favoritesError: null}, {
      type: ActionType.CHANGE_FAVORITES_ERROR_STATUS,
      payload: null
    })).toEqual({favoritesError: null});
  });
  it(`CHANGE_COMMENTS_ERROR_STATUS`, () => {
    expect(reducer({commentsError: null}, {
      type: ActionType.CHANGE_COMMENTS_ERROR_STATUS,
      payload: null
    })).toEqual({commentsError: null});
  });
});
