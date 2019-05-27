import React from 'react';
import renderer from 'react-test-renderer';
import City from './city';
import {citiesData} from '../../mocks/mocks';

it(`City correctly renders active`, () => {
  const tree = renderer
    .create(<City
      isActive={true}
      cityObj={citiesData[0]}
      onClick={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`City correctly renders no active`, () => {
  const tree = renderer
    .create(<City
      isActive={false}
      cityObj={citiesData[0]}
      onClick={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
