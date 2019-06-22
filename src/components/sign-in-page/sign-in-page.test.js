import React from "react";
import renderer from "react-test-renderer";
import SingInPage from "./sign-in-page";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {initialState} from "../../mocks/mocks";

describe(`SingInPage correctly renders`, () => {
  const mockStore = configureStore();
  let store;
  let tree;

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <SingInPage
              userInfo={{email: ``, password: ``}}
              isAuthorizationRequired={true}
              onUserLogin={jest.fn()}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`SingInPage correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
