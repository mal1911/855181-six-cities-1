import React from 'react';
import renderer from 'react-test-renderer';
import Cards from './cards';
import {citiesData} from '../../mocks/mocks';
import {getFilteredOffersData} from '../../reducer';

it(`Cards correctly renders`, () => {
  const tree = renderer
    .create(<Cards
      offersData={getFilteredOffersData(citiesData[0])}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
