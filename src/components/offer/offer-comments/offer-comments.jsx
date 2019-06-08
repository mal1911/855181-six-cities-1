import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerType, commentType} from "../../../prop-types";
import {connect} from "react-redux";
import {Operation} from "../../../reducer/comments-data/comments-data";
import {getCommentsData} from "../../../reducer/comments-data/selectors";
import {getAuthorizationStatus} from "../../../reducer/user-data/selectors";
import OfferComment from "../offer-comment";
import OfferForm from "../offer-form";

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
    const {commentsData, isAuthorizationRequired, offerObj} = this.props;
    const comments = commentsData.map((commentObj, index) =>
      <OfferComment key={index} commentObj={commentObj}/>);

    const withOfferForm = !isAuthorizationRequired ? <OfferForm offerId={offerObj.id}/> : null;

    return <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentsData.length}</span></h2>
      <ul className="reviews__list">
        {comments}
      </ul>
      {withOfferForm}
    </section>;
  }
}

OfferComments.propTypes = {
  commentsData: PropTypes.arrayOf(commentType),
  offerObj: offerType,
  onDidMountComponent: PropTypes.func,
  isAuthorizationRequired: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  commentsData: getCommentsData(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDidMountComponent: (id) => {
    dispatch(Operation.loadCommentsData(id));
  },
});

export {OfferComments};

export default connect(mapStateToProps, mapDispatchToProps)(OfferComments);
