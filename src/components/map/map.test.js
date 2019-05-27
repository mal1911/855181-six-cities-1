import React from 'react';
import renderer from 'react-test-renderer';
import {Map} from './map';
import {citiesData, offersData} from "../../mocks/mocks";

it(`Map correctly renders`, () => {
  const tree = renderer.create(<Map
    citiesData={citiesData}
    filteredOffersData={offersData}
    activeCity={citiesData[0].name}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
