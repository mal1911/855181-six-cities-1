import React from 'react';
import {shallow} from 'enzyme';
import Card from './card';


it(`Simulating button click`, () => {
  const clickHandler = jest.fn();

  const card = shallow(<Card
    title={``}
    onClick={clickHandler}
  />);

  const titleLink = card.find(`.place-card__name a`);
  titleLink.simulate(`click`, {preventDefault() {}});
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

