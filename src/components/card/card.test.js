import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';
import {offers} from "../../mocks/offers";

it(`Card correctly renders`, () => {
  const handlerChangeCardId = jest.fn();
  const tree = renderer
    .create(<Card
      offer={offers[0]}
      onChangeCardId={handlerChangeCardId}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
