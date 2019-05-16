import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map';
import {offers} from "../../mocks/offers";

const mock = offers.map((offer) => {
  return offer.coordinates;
});

it(`Map correctly renders`, () => {
  const tree = renderer
    .create(<Map
      offersCoordinates={mock}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
