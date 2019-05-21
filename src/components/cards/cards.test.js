import React from 'react';
import renderer from 'react-test-renderer';
import Cards from './cards';
import {offersMock} from "../../mocks/offers";

it(`Cards correctly renders`, () => {
  const tree = renderer
    .create(<Cards
      offersData={offersMock}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
