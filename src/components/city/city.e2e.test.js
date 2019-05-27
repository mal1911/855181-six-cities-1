import React from 'react';
import {shallow} from 'enzyme';
import City from './city';
import {citiesData} from '../../mocks/mocks';

const mockEvent = {preventDefault() {}};

it(`Simulating city title click`, () => {
  const handlerChange = jest.fn();

  const city = shallow(<City
    cityObj={citiesData[0]}
    onClick={handlerChange}
    isActive={false}
  />);

  const titleLink = city.find(`.locations__item-link`);
  titleLink.simulate(`click`, mockEvent);
  expect(handlerChange).toHaveBeenCalledTimes(1);
});
