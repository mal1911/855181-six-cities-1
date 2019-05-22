import React from 'react';
import {shallow} from 'enzyme';
import Card from './card';
import {offersData} from '../../mocks/mocks';

const mockEvent = {preventDefault() {}};

it(`Simulating card title click`, () => {
  const handlerChange = jest.fn();

  const card = shallow(<Card
    offerObj={offersData[0]}
    onChange={handlerChange}
  />);

  const titleLink = card.find(`.place-card__name a`);
  titleLink.simulate(`click`, mockEvent);
  expect(handlerChange).toHaveBeenCalledTimes(1);
});

it(`Simulating card image mouseEnter`, () => {
  const handlerChange = jest.fn();

  const card = shallow(<Card
    offerObj={offersData[0]}
    onChange={handlerChange}
  />);

  const imageLink = card.find(`.place-card__image-wrapper a`);
  imageLink.simulate(`mouseEnter`, mockEvent);
  expect(handlerChange).toHaveBeenCalledTimes(1);
});
