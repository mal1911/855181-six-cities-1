import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {compose} from "recompose";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user-data/selectors";
import {SignInPage} from "../../components/sign-in-page/sign-in-page";
import withBodyClass from "../with-body-class/with-body-class";

const withSignInPage = () => {
  const WithSignInPage = (props) => {
    const SignInPageBody = withBodyClass(SignInPage, [`page--gray`, `page--login`]);
    return !props.isAuthorizationRequired
      ?
      <Redirect to="/"/>
      :
      <SignInPageBody {...props}/>;
  };

  WithSignInPage.propTypes = {
    isAuthorizationRequired: PropTypes.bool,
  };

  return WithSignInPage;
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state)
});

export {withSignInPage};

export default compose(connect(mapStateToProps), withSignInPage);
