import React from "react";
import PropTypes from "prop-types";
import "./error-message.css";

const ErrorMessage = (props) => {
  const handleClick = (evt) => {
    if (props.onToggle) {
      props.onToggle();
    }
    evt.preventDefault();
  };

  return (<div className={`error-message ${props.opened ? `error-message--opened` : ``}`} onClick={handleClick}>
    <p className="error-message__test">{`Ошибка: ${props.message}!`}</p>
  </div>);
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onToggle: PropTypes.func,
  opened: PropTypes.bool.isRequired,
};

export default ErrorMessage;


