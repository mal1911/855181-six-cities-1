import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {Operation} from "./offers-data";
import {HTML_STATUS} from "../../constants";

describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const dataLoader = Operation.loadOffersData();

    apiMock
      .onGet(`/hotels`)
      .reply(HTML_STATUS.OK, [{fake: true}]);

    return dataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
  });
});
