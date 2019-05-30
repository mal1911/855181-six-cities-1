import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {ActionType, Operation} from './data';
import {HTML_STATUS} from '../../constants';


describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersDataLoader = Operation.loadOffersData();

    apiMock
      .onGet(`/hotels`)
      .reply(HTML_STATUS.OK, [{fake: true}]);

    return offersDataLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_DATA,
          payload: [{fake: true}],
        });
      });
  });
});
