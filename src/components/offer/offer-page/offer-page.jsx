import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerType} from "../../../prop-types";
import Header from "../../header/index";
import OfferWrapper from "../offer-wrapper/index";
import {connect} from "react-redux";
import {ActionCreator} from "../../../reducer/offers-data/offers-data";
import {getActiveOfferObj} from "../../../reducer/offers-data/selectors";

class OfferPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onDidMountComponent(parseInt(this.props.match.params.id, 10));
  }

  componentWillUnmount() {
  }

  render() {
    const withOfferWrapper = this.props.offerObj ? <OfferWrapper offerObj={this.props.offerObj}/> : null;
    return <React.Fragment>
      <Header/>
      {withOfferWrapper}
    </React.Fragment>;
  }
}

OfferPage.propTypes = {
  match: PropTypes.object,
  offerObj: offerType,
  onDidMountComponent: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offerObj: getActiveOfferObj(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDidMountComponent: (id) => {
    dispatch(ActionCreator.changeActiveOfferId(id));
  },
});

export {OfferPage};

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
