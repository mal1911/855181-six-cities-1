import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app';
import {citiesData} from '../../mocks/mocks';
import {getFilteredOffersData} from '../../reducer';

it(`App correctly renders`, () => {
  const tree = renderer.create(<App
    activeCity={citiesData[0].name}
    filteredOffersData={getFilteredOffersData(citiesData[0].name)}
    citiesData={citiesData}
    onCityClick={jest.fn()}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
