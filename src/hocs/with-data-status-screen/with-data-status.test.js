import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {initialState} from "../../mocks/mocks";
import PlacesWrapperData from "../../components/main/places-wrapper-data";
import PlasesWrapperEmpty from "../../components/main/places-wrapper-empty";
import withDataStatusScreen from "../../hocs/with-data-status-screen/with-data-status-screen";

describe(`WithDataStatusScreen correctly renders`, () => {
  const mockStore = configureStore();
  let store;
  let tree;
  const WithDataStatusScreen = withDataStatusScreen(PlacesWrapperData, PlasesWrapperEmpty);

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <WithDataStatusScreen/>
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`WithDataStatusScreen correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
