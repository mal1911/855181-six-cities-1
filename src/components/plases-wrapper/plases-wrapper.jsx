import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCountResultOffers, getLoadStatus, getError} from "../../reducer/offers-data/selectors";
import PlasesWrapperData from "../plases-wrapper-data";
import PlasesWrapperEmpty from "../plases-wrapper-empty";
import Spinner from "../spinner";
import ErrorMessage from "../error-message";

const PlasesWrapper = (props) => {
  if (props.loadStatus) {
    return <Spinner/>;
  } else if (props.error) {
    return <ErrorMessage/>;
  } else {
    return props.countResultOffers ? <PlasesWrapperData/> : <PlasesWrapperEmpty/>;
  }
};

PlasesWrapper.propTypes = {
  countResultOffers: PropTypes.number.isRequired,
  loadStatus: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  countResultOffers: getCountResultOffers(state),
  loadStatus: getLoadStatus(state),
  error: getError(state),
});

export {PlasesWrapper};

export default connect(mapStateToProps)(PlasesWrapper);
