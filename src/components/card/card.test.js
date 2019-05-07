import React from 'react';
import renderer from 'react-test-renderer';
import Card from './card';

it(`Card correctly renders`, () => {
  const tree = renderer
    .create(<Card
      title={``}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
