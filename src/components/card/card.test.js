import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';
import {offersData} from '../../mocks/mocks';

it(`Card correctly renders`, () => {
  const tree = renderer
    .create(<Card
      offerObj={offersData[0]}
      onChange={jest.fn()}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
