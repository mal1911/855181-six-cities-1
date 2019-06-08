import React, {PureComponent} from "react";
import Header from "../header";
import {connect} from "react-redux";
import {Operation} from "../../reducer/user-data/user-data";
import PropTypes from "prop-types";

class SignInPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: `Oliver.conner@gmail.com`,
      password: ``
    };

    this._handlerSendForm = this._handlerSendForm.bind(this);
    this._handlerChangeEmail = this._handlerChangeEmail.bind(this);
    this._handlerChangePassword = this._handlerChangePassword.bind(this);
  }

  _handlerSendForm(evt) {
    evt.preventDefault();
    this.props.userLogin(this.state);
  }

  _handlerChangeEmail(evt) {
    this.setState({email: evt.target.value});
  }
  _handlerChangePassword(evt) {
    this.setState({password: evt.target.value});
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
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={true}
                  value={this.state.email}
                  onChange={this._handlerChangeEmail}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required={true}
                  value={this.state.password}
                  onChange={this._handlerChangePassword}/>
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!this.state.email || !this.state.password}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link">
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
    dispatch(Operation.userLogin(autorizationObj, ownProps.history));
  }
});

export {SignInPage};

export default connect(null, mapDispatchToProps)(SignInPage);
