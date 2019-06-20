import React from "react";
import {connect} from "react-redux";
import {getResultFavoritesData} from "../../../reducer/data/selectors";
import {getOffersError} from "../../../reducer/data/selectors";
import FavoritesItem from "../favorites-item/index";
import PropTypes from "prop-types";
import withPopupToggle from "../../../hocs/with-popup-toggle/with-popup-toggle";
import ErrorMessage from "../../error-message";

const FavoritesWrapperData = ({resultFavoritesData, error}) => {
  const favoritesItems = resultFavoritesData.map((favoritesObj, index) =>
    <FavoritesItem key={index} favoritesOneData={favoritesObj}/>);

  const showErrorMessage = () => {
    const ToggleErrorMessage = withPopupToggle(ErrorMessage, true);
    return error ? <ToggleErrorMessage message={error.message}/> : null;
  };

  return <React.Fragment>
    {showErrorMessage()}
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">{favoritesItems}</ul>;
        </section>
      </div>
    </main>
  </React.Fragment>;
};

FavoritesWrapperData.propTypes = {
  resultFavoritesData: PropTypes.array,
  error: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  resultFavoritesData: getResultFavoritesData(state),
  error: getOffersError(state),
});

export {FavoritesWrapperData};

export default connect(mapStateToProps)(FavoritesWrapperData);
