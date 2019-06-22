import React from "react";
import renderer from "react-test-renderer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {OfferPage} from "./offer-page";
import {offersData, initialState} from "../../../mocks/mocks";
import {BrowserRouter} from "react-router-dom";
import {Operation} from '../../../reducer/data/data';

describe(`OfferPage correctly renders`, () => {
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
            <OfferPage
              match={{params: {id: `1`}}}
              offerObj={offersData[0]}
              cityIndex={0}
              onLoaded={jest.fn()}
              onChangeActiveOfferObj={jest.fn()}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`OfferPage correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
