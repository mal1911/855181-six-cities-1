import React, {PureComponent} from "react";
import Header from "../../header/index";
import Footer from "../../footer/index";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FavoritesWrpapperData from "../favorites-wrapper-data/index";
import FavoritesWrpapperEmpty from "../favorites-wrapper-empty/index";
import withBodyClass from "../../../hocs/with-body-class/with-body-class";
import withDataStatusScreen from "../../../hocs/with-data-status-screen/with-data-status-screen";
import {getCountResultFavorites, getFavoritesLoadStatus, getFavoritesError} from "../../../reducer/favorites-data/selectors";
import {Operation} from "../../../reducer/favorites-data/favorites-data";
import {withRouter} from "react-router";
import {FavoritesItem} from "../favorites-item/favorites-item";

class FavoritesPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoaded();
  }

  render() {
    const FavoritesWrpapperEmptyBody = withBodyClass(FavoritesWrpapperEmpty, [`page--favorites-empty`]);
    const WithDataStatusScreen = withDataStatusScreen(FavoritesWrpapperData, FavoritesWrpapperEmptyBody);
    return <React.Fragment>
      <Header/>
      <WithDataStatusScreen {...this.props}/>
      <Footer/>
    </React.Fragment>;
  }
}

FavoritesPage.propTypes = {
  countData: PropTypes.number.isRequired,
  loadStatus: PropTypes.bool,
  error: PropTypes.object,
  onLoaded: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  countData: getCountResultFavorites(state),
  loadStatus: getFavoritesLoadStatus(state),
  error: getFavoritesError(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onLoaded: () => {
    dispatch(Operation.loadFavoritesData(ownProps.history));
  },
});

export {FavoritesPage};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FavoritesPage));
