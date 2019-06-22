import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {OfferComments} from "./offer-comments";
import {offersData, commentsData, initialState} from "../../../mocks/mocks";
import {BrowserRouter} from "react-router-dom";

describe(`OfferComments correctly renders`, () => {
  const mockStore = configureStore();
  let store;
  let tree;

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <OfferComments
              commentsData={commentsData}
              offerObj={offersData[0]}
              onLoaded={jest.fn()}
              isAuthorizationRequired={false}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`OfferComments correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
