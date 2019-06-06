import React from 'react';
import Cards from '../cards/cards';
import CardsHeader from '../cards-header/cards-header';
import PopupSortingElement from '../pupup-sorting-element/popup-sorting-element';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import withPopupToggle from '../../hocs/with-popup-toggle/with-popup-toggle';

const CardsWrapper = () => {
  const ActivatedPopupSortingElement = withActiveItem(withPopupToggle(PopupSortingElement), 0);
  const ActivatedCards = withActiveItem(Cards);

  return <section className="cities__places places">
    <CardsHeader/>
    <ActivatedPopupSortingElement/>
    <ActivatedCards/>
  </section>;
};

export default CardsWrapper;
