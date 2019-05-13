import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';

const mock = `Beautiful & luxurious apartment at great location`;

it(`Card correctly renders`, () => {
  const tree = renderer
    .create(<Card
      title={mock}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
