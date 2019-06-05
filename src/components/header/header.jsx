import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../reducer/user/selectors";
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <NavLink className="header__logo-link" to="/" activeClassName={`header__logo-link--active`}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </NavLink>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              <NavLink className="header__nav-link header__nav-link--profile" to="/favorites" activeClassName={null}>
                <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage: `${props.userInfo ? props.userInfo.avatarUrl : null}`}}>
                </div>
                <span className="header__user-name user__name">{props.userInfo ? props.userInfo.email : `Sign In`}</span>
              </NavLink>
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
