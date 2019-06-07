import React from "react";
import {connect} from "react-redux";
import {getResultFavoritesData} from "../../../reducer/favorites-data/selectors";
import FavoritesItem from "../favorites-item/index";
import PropTypes from "prop-types";

const FavoritesWrapperData = (props) => {
  const favoritesItems = props.resultFavoritesData.map((favoritesObj, index) =>
    <FavoritesItem key={index} favoritesOneData={favoritesObj}/>);

  return <React.Fragment>
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
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  resultFavoritesData: getResultFavoritesData(state),
});

export {FavoritesWrapperData};

export default connect(mapStateToProps)(FavoritesWrapperData);
