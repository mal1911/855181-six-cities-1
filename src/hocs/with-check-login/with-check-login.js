import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {compose} from "recompose";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user-data/selectors";

const withCheckLogin = (Component) => {
  const WithCheckLogin = (props) => {
    return props.isAuthorizationRequired
      ?
      <Redirect to="/login"/>
      :
      <Component {...props} />;
  };

  WithCheckLogin.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithCheckLogin;
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state)
});

export {withCheckLogin};

export default compose(connect(mapStateToProps), withCheckLogin);
