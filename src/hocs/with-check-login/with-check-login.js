import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {compose} from "recompose";
import {connect} from "react-redux";
import {getAuthorizationStatus, getUserLoadStatus, getUserError} from "../../reducer/user-data/selectors";

const withCheckLogin = (Component) => {
  const WithCheckLogin = (props) => {
    return props.isAuthorizationRequired && !props.loadStatus
      ?
      <Redirect to="/login"/>
      :
      <Component {...props} />;
  };

  WithCheckLogin.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
    loadStatus: PropTypes.bool,
    error: PropTypes.object,
  };

  return WithCheckLogin;
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state),
  loadStatus: getUserLoadStatus(state),
  error: getUserError(state),
});

export {withCheckLogin};

export default compose(connect(mapStateToProps), withCheckLogin);
