import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation, ActionType} from "./data";
import {HTML_STATUS} from "../../constants";
import {offersData, favoritesData} from "../../mocks/mocks";

describe(`Reducer works correctly`, () => {
  it(`Testing a list of hotels`, function () {
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
});
