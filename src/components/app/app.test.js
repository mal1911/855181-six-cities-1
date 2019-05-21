import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import {offersMock} from '../../mocks/offers';
import {citiesMock} from '../../mocks/cities-mock';

it(`App correctly renders`, () => {
  const tree = renderer
    .create(<App
      offersData={offersMock}
      citiesData={citiesMock}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
