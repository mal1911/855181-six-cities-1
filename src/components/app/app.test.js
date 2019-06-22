import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-spaces";

describe(`App correctly renders`, () => {
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
    tree = renderer.create(<Provider store={store}>
      <App
        store={store}
        isAuthorizationRequired={true}
      />
    </Provider>).toJSON();
  });

  it(`App correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
