import React from 'react';
import {mount} from 'enzyme';
import Card from './card';
import {offersData} from '../../mocks/mocks';
import {BrowserRouter} from "react-router-dom";

const mockEvent = {
  preventDefault() {
  }
};
describe(`e2e test Card`, () => {
  it(`Simulating card title click`, () => {
    const handleChange = jest.fn();
    const handleButtonClick = jest.fn();

    const card = mount(
        <BrowserRouter>
          <Card
            offerObj={offersData[0]}
            cardClassName={`favorites`}
            onChange={handleChange}
            onButtonClick={handleButtonClick}
          />
        </BrowserRouter>
    );

    const titleLink = card.find(`.place-card__name a`);
    titleLink.simulate(`click`, mockEvent);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it(`Simulating card image click`, () => {
    const handleChange = jest.fn();
    const handleButtonClick = jest.fn();

    const card = mount(
        <BrowserRouter>
          <Card
            offerObj={offersData[0]}
            cardClassName={`favorites`}
            onChange={handleChange}
            onButtonClick={handleButtonClick}
          />
        </BrowserRouter>
    );

    const imageLink = card.find(`.place-card__image-wrapper a`);
    imageLink.simulate(`click`, mockEvent);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it(`Simulating button favorite click`, () => {
    let activeOfferObj = {};
    const handleChange = jest.fn();
    const handleButtonClick = () => {
      activeOfferObj = offersData[0];
    };

    const card = mount(
        <BrowserRouter>
          <Card
            offerObj={offersData[0]}
            cardClassName={`favorites`}
            onChange={handleChange}
            onButtonClick={handleButtonClick}
          />
        </BrowserRouter>
    );

    const favoriteButton = card.find(`.place-card__bookmark-button`);
    favoriteButton.simulate(`click`, mockEvent);
    expect(activeOfferObj).toEqual(offersData[0]);
  });
});
