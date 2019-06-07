import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerType, commentType} from "../../../prop-types";
import {connect} from "react-redux";
import {Operation} from "../../../reducer/comments-data/comments-data";
import {getCommentsData} from "../../../reducer/comments-data/selectors";

class OfferComments extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onDidMountComponent(this.props.offerObj.id);
  }

  componentWillUnmount() {
  }

  render() {
    return <React.Fragment>
      <h1>QUQU</h1>
    </React.Fragment>;
  }
}

OfferComments.propTypes = {
  commentsData: PropTypes.arrayOf(commentType),
  offerObj: offerType,
  onDidMountComponent: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  commentsData: getCommentsData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDidMountComponent: (id) => {
    dispatch(Operation.loadData(id));
  },
});

export {OfferComments};

export default connect(mapStateToProps, mapDispatchToProps)(OfferComments);
