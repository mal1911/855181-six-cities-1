import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offersData, citiesData} from '../../mocks/mocks';
const getFilteredOffersData = (city) => offersData.filter((offer) => offer.city === city);

describe(`App correctly renders`, ()=>{
  const initialState = {
    activeCity: citiesData[0].name,
    filteredOffersData: getFilteredOffersData(citiesData[0].name),
    citiesData,
  };
  const mockStore = configureStore();
  let store;
  let tree;

  beforeEach(()=>{
    store = mockStore(initialState);
    tree = renderer.create(<Provider store={store}><App
      store={store}
    /></Provider>).toJSON();
  });

  it(`App correctly renders`, () => {
    expect(tree).toMatchSnapshot();
  });
});
