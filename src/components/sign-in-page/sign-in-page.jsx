import React, {PureComponent} from 'react';
import Header from '../header';
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/user/user';
import {createAPI} from '../../api';
import PropTypes from "prop-types";
import {transformHostForLoading, transformUserForLoading} from "../../transform-data";

class SignInPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: `Oliver.conner@gmail.com`,
      password: ``
    };

    this._handlerSendForm = this._handlerSendForm.bind(this);
    document.body.classList.add(`page--login`);
  }

  _handlerSendForm(evt) {
    evt.preventDefault();
    this.props.userLogin(this.state);
  }

  render() {
    return (<React.Fragment>
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={this._handlerSendForm}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required="" onChange={(evt) => this.setState({email: evt.target.value})}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required="" onChange={(evt) => this.setState({password: evt.target.value})}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>);
  }
}

SignInPage.propTypes = {
  userLogin: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  userLogin: (autorizationObj) => {
    createAPI(dispatch)
      .post(`/login`, autorizationObj)
      .then((response) => {
        const data = transformUserForLoading(response.data);
        dispatch(ActionCreator.userLogin(data));
        dispatch(ActionCreator.requireAuthorization(false));
      });
    ownProps.history.push(`/`);
  }
});

export {SignInPage};

export default connect(null, mapDispatchToProps)(SignInPage);
