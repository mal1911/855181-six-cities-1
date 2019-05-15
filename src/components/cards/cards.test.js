import React from 'react';
import renderer from 'react-test-renderer';
import Cards from './cards';
import {offers} from "../../mocks/offers";

it(`Card correctly renders`, () => {
  const tree = renderer
    .create(<Cards
      offers={offers}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
