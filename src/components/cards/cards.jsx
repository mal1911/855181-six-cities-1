import React from "react";
import PropTypes from "prop-types";
import {offerType} from "../../prop-types";
import Card from "../card/card";
import {connect} from "react-redux";
import {getResultOffersData} from "../../reducer/data/selectors";
import {Redirect} from "react-router-dom";

const Cards = (props) => {
  const handlerChange = (cardObj) => {
    props.setActiveItem(cardObj.id);
    //<Redirect to="/results" />;
  };

  const cards = props.resultOffersData.map((offerObj, index) =>
    <Card key={index} offerObj={offerObj} onChange={handlerChange}/>);

  return <div className="cities__places-list places__list tabs__content">
    {cards}
  </div>;
};

Cards.propTypes = {
  resultOffersData: PropTypes.arrayOf(offerType.isRequired).isRequired,
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  resultOffersData: getResultOffersData(state),
});

export {Cards};
export default connect(mapStateToProps)(Cards);


