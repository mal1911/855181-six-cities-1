import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {initialState} from "../../mocks/mocks";
import withCheckLogin from "./with-check-login";
import FavoritesPage from "../../components/favorites/favorites-page";
import thunk from "redux-thunk";
import {Operation} from "../../reducer/data/data";


describe(`withCheckLogin correctly renders`, () => {
  const mockStore = configureStore([thunk]);
  let store;
  let tree;
  const WithCheckLogin = withCheckLogin(FavoritesPage);

  Operation.changeFavoriteStatus = () => (dispatch) => dispatch(jest.fn());
  Operation.loadFavoritesData = () => (dispatch) => dispatch(jest.fn());

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <WithCheckLogin/>
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`withCheckLogin correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
