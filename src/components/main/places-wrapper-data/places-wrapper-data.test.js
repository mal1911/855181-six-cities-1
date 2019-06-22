import React from "react";
import renderer from "react-test-renderer";
import {PlacesWrapperData} from "./places-wrapper-data";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offersLocationsData, initialState} from "../../../mocks/mocks";

describe(`PlacesWrapperData correctly renders`, () => {
  const mockStore = configureStore();
  let store;
  let tree;

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <PlacesWrapperData
              offersLocationsData={offersLocationsData}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`PlacesWrapperData correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
