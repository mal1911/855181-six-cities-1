import React from 'react';
import {shallow} from 'enzyme';
import Card from './card';
import {offers} from "../../mocks/offers";

it(`Simulating card title click`, () => {
  const handlerChangeCardId = jest.fn();

  const card = shallow(<Card
    offer={offers[0]}
    onChangeCardId={handlerChangeCardId}
  />);

  const titleLink = card.find(`.place-card__name a`);
  titleLink.simulate(`click`, {preventDefault() {}});
  expect(handlerChangeCardId).toHaveBeenCalledTimes(1);
});

it(`Simulating card image mouseEnter`, () => {
  const handlerChangeCardId = jest.fn();

  const card = shallow(<Card
    offer={offers[0]}
    onChangeCardId={handlerChangeCardId}
  />);

  const imageLink = card.find(`.place-card__image-wrapper a`);
  imageLink.simulate(`mouseEnter`, {preventDefault() {}});
  expect(handlerChangeCardId).toHaveBeenCalledTimes(1);
});

