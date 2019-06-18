import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../../prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../../reducer/offers-data/offers-data";
import Card from "../../card/card";

import {getResultOffersData} from "../../../reducer/offers-data/selectors";

const Cards = (props) => {
  const handleChange = (cardObj) => {
    props.onChangeActiveCard(cardObj.id);
  };

  const cards = props.resultOffersData.map((offerObj, index) =>
    <Card key={index} offerObj={offerObj} onChange={handleChange} cardClassName={`cities`}/>);

  return <div className="cities__places-list places__list tabs__content">
    {cards}
  </div>;
};

Cards.propTypes = {
  resultOffersData: PropTypes.arrayOf(offerType.isRequired).isRequired,
  onChangeActiveCard: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  resultOffersData: getResultOffersData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeActiveCard: (id) => {
    dispatch(ActionCreator.changeActiveOfferId(id));
  },
});

export {Cards};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
