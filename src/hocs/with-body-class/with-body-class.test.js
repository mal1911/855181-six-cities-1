import React from "react";
import renderer from "react-test-renderer";
import MainPage from "../../components/main/main-page";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {initialState} from "../../mocks/mocks";
import withBodyClass from "./with-body-class";

describe(`withBodyClass correctly renders`, () => {
  const mockStore = configureStore();
  let store;
  let tree;
  const MainPageBody = withBodyClass(MainPage, [`page--gray`, `page--main`]);

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <MainPageBody/>
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`MainPage correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
