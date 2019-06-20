import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import MainPage from "../main/main-page";
import FavoritesPage from "../favorites/favorites-page";
import OfferPage from "../offer/offer-page";
import withCheckLogin from "../../hocs/with-check-login/with-check-login";
import withBodyClass from "../../hocs/with-body-class/with-body-class";
import {getAuthorizationStatus} from "../../reducer/user-data/selectors";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SignInPage from "../sign-in-page";

const App = ({isAuthorizationRequired}) => {
  const MainPageBody = withBodyClass(MainPage, [`page--gray`, `page--main`]);
  const SignInPageBody = withBodyClass(SignInPage, [`page--gray`, `page--login`]);

  return <BrowserRouter>
    <Switch>
<<<<<<< HEAD
      <Route path="/" exact component={withBodyClass(MainPage, [`page--gray`, `page--main`])}/>
      <Route path="/offer/:id" component={OfferPage}/>
      <Route path="/favorites" component={withCheckLogin(FavoritesPage)}/>
      <Route path="/login" component={withBodyClass(SignInPage, [`page--gray`, `page--login`])}/>
=======
      <Route path="/" exact component={MainPageBody}/>
      <Route path="/favorites" component={withCheckLogin(FavoritesPage)}/>
      <Route path="/login" render={() => isAuthorizationRequired ? <SignInPageBody/> : <Redirect to="/"/>}/>
      <Route path="/offer/:id" component={OfferPage}/>
>>>>>>> ae9f79e76e09f3b6154509acbbffa4453b8be2d5
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>;
};

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state)
});


export {App};

export default connect(mapStateToProps)(App);
