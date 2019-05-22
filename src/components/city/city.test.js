import React from 'react';
import renderer from 'react-test-renderer';
import City from './city';
import {citiesData} from '../../mocks/mocks';

it(`City correctly renders active`, () => {
  const tree = renderer
    .create(<City
      isActive={true}
      city={citiesData[0].name}
      onClick={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`City correctly renders no active`, () => {
  const tree = renderer
    .create(<City
      isActive={false}
      city={citiesData[0].name}
      onClick={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
