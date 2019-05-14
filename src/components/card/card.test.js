import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';
import {offers} from "../../mocks/offers";

it(`Card correctly renders`, () => {
  const handlerClick = jest.fn();
  const tree = renderer
    .create(<Card
      offer={offers[0]}
      onClick={handlerClick}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
