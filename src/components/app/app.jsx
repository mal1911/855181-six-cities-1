import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import {getAuthorizationStatus} from '../../reducer/user/selectors';
import MainPage from "../main-page";
import FavoritesPage from "../favorites-page";
import SignInPage from '../sign-in-page';
import OfferPage from "../offer-page";
import withMainPageScreenSwitch from "../../hocs/with-main-page-screen-switch/with-main-page-screen-switch";

//const MainPageWrapped = withMainPageScreenSwitch(MainPage);

const App = (props) => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact render={() => <MainPage/>}/>
      <Route path="/favorites" exact render={() => <FavoritesPage/>}/>
      <Route path="/login" exact render={() => <SignInPage/>}/>
      <Route path="/offer/:id" exact render={() => <OfferPage/>}/>
    </Switch>
  </BrowserRouter>;
};

App.propTypes = {
  authorizationStatus: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps)(App);
