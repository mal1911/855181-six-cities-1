import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card';

Enzyme.configure({adapter: new Adapter()});

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

