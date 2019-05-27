import React from 'react';
import renderer from 'react-test-renderer';
import {Cards} from './cards';
import {citiesData} from '../../mocks/mocks';
import {getFilteredOffersData} from '../../reducer';

it(`Cards correctly renders`, () => {
  const tree = renderer
    .create(<Cards
      filteredOffersData={getFilteredOffersData(citiesData[0])}
      activeItem={0}
      activeCity={citiesData[0].name}
      setActiveItem={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
