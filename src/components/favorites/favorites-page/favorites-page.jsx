import React, {PureComponent} from "react";
import Header from "../../header/index";
import Footer from "../../footer/index";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FavoritesWrpapperData from "../favorites-wrapper-data/index";
import FavoritesWrpapperEmpty from "../favorites-wrapper-empty/index";
import withBodyClass from "../../../hocs/with-body-class/with-body-class";
import {getCountResultFavorites, getLoadStatus, getError} from "../../../reducer/favorites-data/selectors";
import {Operation} from "../../../reducer/favorites-data/favorites-data";


class FavoritesPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onDidMountComponent();
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
  onDidMountComponent: PropTypes.func,

};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  countResultFavorites: getCountResultFavorites(state),
  loadStatus: getLoadStatus(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDidMountComponent: () => {
    dispatch(Operation.loadData());
  },
});

export {FavoritesPage};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
