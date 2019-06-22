import React from "react";
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {OfferWrapper} from "./offer-wrapper";
import {offersData, favoritesData, offersLocationsData, initialState} from "../../../mocks/mocks";
import {BrowserRouter} from "react-router-dom";
import {Operation} from '../../../reducer/data/data';

describe(`OfferWrapper correctly renders`, () => {
  const mockStore = configureStore([thunk]);
  let store;
  let tree;
  jest.mock(`../../../reducer/data/data`);
  Operation.loadCommentsData = () => (dispatch) => dispatch(jest.fn());

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <OfferWrapper
              offerObj={offersData[0]}
              nearData={offersData.slice(0, 3)}
              offersData={offersData}
              favoritesData={favoritesData}
              nearLocationsData={offersLocationsData.slice(0, 3)}
              error={null}
              onChangeActiveCard={jest.fn()}
              onChangeFavoriteStatus={jest.fn()}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`OfferWrapper correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
