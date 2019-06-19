import React from "react";
import PropTypes from "prop-types";
import Spinner from "../../components/spinner";
import ErrorMessage from "../../components/error-message";

const withDataStatusScreen = (ComponentData, ComponentEmpty) => {
  const WithDataStatusScreen = ({countData, loadStatus, error}) => {
    if (loadStatus) {
      return <Spinner/>;
    } else if (error) {
      return <ErrorMessage message={error.message} opened={true}/>;
    } else {
      return countData > 0 ? <ComponentData/> : <ComponentEmpty/>;
    }
  };

  WithDataStatusScreen.propTypes = {
    countData: PropTypes.number,
    loadStatus: PropTypes.bool,
    error: PropTypes.object,
  };

  return WithDataStatusScreen;
};

export default withDataStatusScreen;
