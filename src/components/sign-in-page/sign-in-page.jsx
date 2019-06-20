import React, {PureComponent} from "react";
import Header from "../header";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import {Operation} from "../../reducer/user/user";
import {getUserInfo, getAuthorizationStatus} from "../../reducer/user/selectors";


class SignInPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: `Oliver.conner@gmail.com`,
      password: ``
    };

    this._handleSendForm = this._handleSendForm.bind(this);
    this._handleChangeEmail = this._handleChangeEmail.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
  }

  componentWillReceiveProps({userInfo}) {
    if (userInfo) {
      this.setState({
        email: userInfo.email,
      });
    }
  }

  render() {
    return <React.Fragment>
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={this._handleSendForm}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={true}
                  value={this.state.email}
                  onChange={this._handleChangeEmail}/>
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
                  onChange={this._handleChangePassword}/>
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
    </React.Fragment>;
  }

  _handleSendForm(evt) {
    evt.preventDefault();
    this.props.onUserLogin(this.state);
  }

  _handleChangeEmail(evt) {
    this.setState({email: evt.target.value});
  }

  _handleChangePassword(evt) {
    this.setState({password: evt.target.value});
  }
}

SignInPage.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  isAuthorizationRequired: PropTypes.bool,
  onUserLogin: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userInfo: getUserInfo(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUserLogin: (autorizationObj) => {
    dispatch(Operation.userLogin(autorizationObj, () => ownProps.history.push(`/login`)));
  }
});

export {SignInPage};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInPage));
