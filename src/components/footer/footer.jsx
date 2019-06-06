import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

const Footer = (props) => {
  const logoSrc = `${props.pathIndex ? props.pathIndex : ``}/img/logo.svg`;
  const rootPath = !props.isMainPage ? `/` : ``;

  return <footer className="footer container">
    <NavLink className="footer__logo-link" to={rootPath}>
      <img className="footer__logo" src={logoSrc} alt="6 cities logo" width="64" height="33"/>
    </NavLink>
  </footer>;
};

Footer.propTypes = {
  pathIndex: PropTypes.number,
  isMainPage: PropTypes.bool,
};

export default Footer;
