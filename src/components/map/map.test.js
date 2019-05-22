import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map';
import {citiesData} from '../../mocks/mocks';
import {getFilteredOffersData} from '../../reducer';

const offersCoordinatesData = getFilteredOffersData(citiesData[0].name).map((offerObj) => offerObj.coordinates);
const cityCoordinates = citiesData[0].coordinates;

it(`Map correctly renders`, () => {
  const tree = renderer
    .create(<Map
      offersCoordinates={offersCoordinatesData}
      cityCoordinates={cityCoordinates}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
