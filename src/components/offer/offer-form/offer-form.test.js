import React from "react";
import renderer from "react-test-renderer";
import {OfferForm} from "./offer-form";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offersData, initialState} from "../../../mocks/mocks";

describe(`OfferForm correctly renders`, () => {
  const mockStore = configureStore();
  let store;
  let tree;

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <OfferForm
              offerId={offersData[0].id}
              onSendForm={jest.fn()}
              error={null}
              loadStatus={false}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`OfferForm correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
