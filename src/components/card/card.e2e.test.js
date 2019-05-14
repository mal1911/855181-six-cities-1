import React from 'react';
import {shallow} from 'enzyme';
import Card from './card';
import {offers} from "../../mocks/offers";

it(`Simulating card title click`, () => {
  const handlerClick = jest.fn();

  const card = shallow(<Card
    offer={offers[0]}
    onClick={handlerClick}
  />);

  const titleLink = card.find(`.place-card__name a`);
  titleLink.simulate(`click`, {preventDefault() {}});
  expect(handlerClick).toHaveBeenCalledTimes(1);
});

/*  expect(output.state().clicked).toEqual(false);
  output.simulate('click');
  expect(output.state().clicked).toEqual(true);*/
