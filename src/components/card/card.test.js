import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import Card from './card';
import {offersData} from '../../mocks/mocks';

it(`Card correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Card
        offerObj={offersData[0]}
        cardClassName={``}
        onChange={jest.fn()}
        onButtonClick={jest.fn()}
      />
    </BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
