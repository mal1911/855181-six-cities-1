import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';
import {offersMock} from "../../mocks/offers-mock";

it(`Card correctly renders`, () => {
  const handlerChange = jest.fn();
  const tree = renderer
    .create(<Card
      offerObj={offersMock[0]}
      onChangeCardId={handlerChange}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
