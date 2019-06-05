import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {getCountResultOffers} from "../../reducer/offers-data/selectors";
import PlasesWrapper from "../../components/plases-wrapper";
//import PlasesWrapperEmpty from "../../components/plases-wrapper-empty";
import {offerType} from "../../prop-types";

const withMainPageScreenSwitch = (Component) => {
  class WithMainPageScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          renderScreen={this._getScreen}
        />
      );
    }

    _getScreen() {
//      if (this.props.filteredOffersData.length) {
        return <PlasesWrapper/>;
  //    } else {
  //      return <PlasesWrapperEmpty/>;
  //    }
    }
  }

  WithMainPageScreenSwitch.propTypes = {
    countResultOffers: PropTypes.arrayOf(offerType.isRequired).isRequired,
  };

  return WithMainPageScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  countResultOffers: getCountResultOffers(state),
});

export {withMainPageScreenSwitch};

export default compose(
    connect(mapStateToProps),
    withMainPageScreenSwitch
);

//export default withMainPageScreenSwitch;
