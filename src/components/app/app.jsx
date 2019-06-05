import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import MainPage from "../main-page";
import FavoritesPage from "../favorites-page";
import SignInPage from "../sign-in-page";
import OfferPage from "../offer-page";
import withCheckLogin from "../../hocs/with-check-login/with-check-login";
import withBodyClass from "../../hocs/with-body-class/with-body-class";

const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route path="/" exact component={withBodyClass(MainPage, [`page--gray`, `page--main`])}/>
      <Route path="/favorites" exact component={withCheckLogin(FavoritesPage)}/>
      <Route path="/login" exact component={withBodyClass(SignInPage, [`page--gray`, `page--login`])}/>
      <Route path="/offer/:id" exact component={OfferPage}/>
      <Redirect to="/"/>
    </Switch>
  </BrowserRouter>;
};

export default App;
