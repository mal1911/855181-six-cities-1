import React from 'react';
import renderer from 'react-test-renderer';
import Cards from './cards';
import {offers} from "../../mocks/offers";

it(`Card correctly renders`, () => {
  const handlerClick = jest.fn();
  const tree = renderer
    .create(<Cards
      offers={offers}
      onClick={handlerClick}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
