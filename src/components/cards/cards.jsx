import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';

export default class Cards extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: 0,
    };
    this._handlerChange = this._handlerChange.bind(this);
  }

  _handlerChange(evt, cardObj) {
    this.setState({activeCardId: cardObj.id});
    evt.preventDefault();
  }

  render() {
    const cards = this.props.offersData.map((offerObj, index) =>
      <Card key={index} offerObj={offerObj} onChange={this._handlerChange}/>
    );

    return <div className="cities__places-list places__list tabs__content">
      {cards}
    </div>;
  }
}

Cards.propTypes = {
  offersData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    idCity: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    imgSrc: PropTypes.string.isRequired,
  }).isRequired),
};
