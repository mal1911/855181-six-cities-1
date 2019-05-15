import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';

export default class Cards extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: 0,
    };
    this._handlerChangeCardId = this._handlerChangeCardId.bind(this);
  }

  _handlerChangeCardId(evt, id) {
    this.setState({activeCardId: id});
    evt.preventDefault();
  }

  render() {
    const cards = this.props.offers.map((offer, index) => {
      return <Card key={index} offer={offer} onChangeCardId={this._handlerChangeCardId}/>;
    });

    return <div className="cities__places-list places__list tabs__content">
      {cards}
    </div>;
  }
}

Cards.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired),
};
