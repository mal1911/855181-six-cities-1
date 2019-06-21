import React from 'react';
import renderer from 'react-test-renderer';
import {FavoritesPage} from './favorites-page';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../../reducer/name-spaces";

describe(`FavoritesPage correctly renders`, () => {
  const initialState = {};

  initialState[NameSpace.USER] = {
    isAuthorizationRequired: true,
    userObj: null,
    isUserLoading: true,
    userError: null,
  };

  initialState[NameSpace.DATA] = {
    activeCityIndex: 0,
    activeOrderIndex: 0,
    activeOfferId: 0,
    offersData: [],
    favoritesData: [],
    commentsData: [],
    offersError: null,
    favoritesError: null,
    commentsError: null,
    isLoading: true,
  };

  const mockStore = configureStore();
  let store;
  let tree;

  beforeEach(() => {
    store = mockStore(initialState);
    tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <FavoritesPage
              countData={1}
              loadStatus={false}
              error={null}
              onLoaded={jest.fn()}
            />
          </BrowserRouter>
        </Provider>
    ).toJSON();
  });

  it(`FavoritesPage correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
