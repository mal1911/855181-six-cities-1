import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCountResultOffers, getOffersLoadStatus, getOffersError} from "../../../reducer/offers-data/selectors";
import PlacesWrapperData from "../places-wrapper-data";
import PlasesWrapperEmpty from "../places-wrapper-empty";
import withDataStatusScreen from "../../../hocs/with-data-status-screen/with-data-status-screen";

const PlacesWrapper = (props) => {
  const WithDataStatusScreen = withDataStatusScreen(PlacesWrapperData, PlasesWrapperEmpty);

  return <WithDataStatusScreen {...props}/>;
};

PlacesWrapper.propTypes = {
  countData: PropTypes.number.isRequired,
  loadStatus: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  countData: getCountResultOffers(state),
  loadStatus: getOffersLoadStatus(state),
  error: getOffersError(state),
});

export {PlacesWrapper};

export default connect(mapStateToProps)(PlacesWrapper);
