import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../reducer/user/selectors";
import PropTypes from 'prop-types';

const Header = (props) => {
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <a className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </a>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <a className="header__nav-link header__nav-link--profile" href="#">
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `${props.userInfo ? props.userInfo.avatarUrl : `none`}`}}>
                </div>
                <span className="header__user-name user__name">{props.userInfo ? props.userInfo.email : `Sign In`}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

Header.propTypes = {
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  })
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  userInfo: getUserInfo(state),
});

export {Header};
export default connect(mapStateToProps)(Header);
