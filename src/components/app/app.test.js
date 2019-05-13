import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

const mock = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
];

it(`App correctly renders`, () => {
  const tree = renderer
    .create(<App
      titles={mock}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
