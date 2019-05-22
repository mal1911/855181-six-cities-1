import React from 'react';
import renderer from 'react-test-renderer';
import Cities from './cities';
import {citiesData} from '../../mocks/mocks';

it(`Cities correctly renders`, () => {
  const tree = renderer
    .create(<Cities
      citiesData={citiesData}
      activeCity={citiesData[0].name}
      onCityClick={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
