import React, {PureComponent} from "react";
import Header from "../header/";
import Footer from "../footer";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FavoritesWrpapperData from "../favorites-wrapper-data";
import FavoritesWrpapperEmpty from "../favorites-wrapper-empty";
import withBodyClass from "../../hocs/with-body-class/with-body-class";
import {getCountResultFavorites, getLoadStatus, getError} from "../../reducer/favorites-data/selectors";
import {Operation} from "../../reducer/favorites-data/favorites-data";


class FavoritesPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(Operation.loadData());
  }

  componentWillUnmount() {
  }

  render() {
    const FavoritesWrpapperEmptyBody = withBodyClass(FavoritesWrpapperEmpty, [`page--favorites-empty`]);
    return <React.Fragment>
      <Header/>
      {/*
        <FavoritesWrpapperEmptyBody/>
      */}
      <FavoritesWrpapperData/>


      <Footer/>
    </React.Fragment>;
  }
}

FavoritesPage.propTypes = {
  countResultFavorites: PropTypes.number.isRequired,
  loadStatus: PropTypes.bool,
  error: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  countResultFavorites: getCountResultFavorites(state),
  loadStatus: getLoadStatus(state),
  error: getError(state),
});

export {FavoritesPage};

export default connect(mapStateToProps)(FavoritesPage);
