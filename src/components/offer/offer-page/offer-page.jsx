import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerType, cityType} from "../../../prop-types";
import Header from "../../header/index";
import OfferWrapper from "../offer-wrapper/index";
import {connect} from "react-redux";
import {ActionCreator} from "../../../reducer/offers-data/offers-data";
import {getActiveOfferObj, getCityIndexFromOfferId, getOffersData, getCitiesData} from "../../../reducer/offers-data/selectors";

class OfferPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoaded(parseInt(this.props.match.params.id, 10));
  }

  componentWillReceiveProps(nextProps) {
    /*if (nextProps.offersData.length) {
      const cityName = nextProps.offersData.find((offerObj) => offerObj.id === nextProps.offerObj.id).city.name;
      this.props.onChangeActiveOfferObj(nextProps.citiesData.findIndex((cityObj) => cityObj.name === cityName));
    }*/
    if (nextProps.offerObj) {
      this.props.onChangeActiveOfferObj(nextProps.cityIndex);
    }
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
  //offersData: PropTypes.arrayOf(offerType),
  //citiesData: PropTypes.arrayOf(cityType),
  cityIndex: PropTypes.number,
  onLoaded: PropTypes.func,
  onChangeActiveOfferObj: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offerObj: getActiveOfferObj(state),
  cityIndex: getCityIndexFromOfferId(state),
  //offersData: getOffersData(state),
  //citiesData: getCitiesData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoaded: (id) => {
    dispatch(ActionCreator.changeActiveOfferId(id));
  },
  onChangeActiveOfferObj: (index) => {
    dispatch(ActionCreator.changeActiveCityIndex(index));
  }
});

export {OfferPage};

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
