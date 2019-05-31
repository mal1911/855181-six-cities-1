import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAuthorizationStatus} from '../../reducer/user/selectors';
import MainPage from '../main-page';
import SignInPage from '../sign-in-page';

const App = (props) => {
  if (props.authorizationStatus) {
    return (<SignInPage/>);
  } else {
    return (<MainPage/>);
  }
};

App.propTypes = {
  authorizationStatus: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps)(App);
