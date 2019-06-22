import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../../reducer/data/data";
import {getLoadStatus, getCommentsError} from "../../../reducer/data/selectors";
import {MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from "../../../constants";
import ErrorMessage from "../../error-message";
import withPopupToggle from "../../../hocs/with-popup-toggle/with-popup-toggle";

class OfferForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      comment: ``,
    };

    this._handleSendForm = this._handleSendForm.bind(this);
    this._handleChangeRating = this._handleChangeRating.bind(this);
    this._handleChangeComment = this._handleChangeComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loadStatus && !nextProps.error) {
      this._resetForm();
    }
  }

  render() {
    const isCheckedRating = (value) => this.state.rating === value;

    return <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={this._handleSendForm}
    >
      {this._showErrorMessage()}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={this._handleChangeRating}
          checked={isCheckedRating(5)}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={this._handleChangeRating}
          checked={isCheckedRating(4)}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={this._handleChangeRating}
          checked={isCheckedRating(3)}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={this._handleChangeRating}
          checked={isCheckedRating(2)}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={this._handleChangeRating}
          checked={isCheckedRating(1)}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        minLength={MIN_COMMENT_LENGTH}
        maxLength={MAX_COMMENT_LENGTH}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={this.state.comment}
        onChange={this._handleChangeComment}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            !this.state.rating ||
            !(this.state.comment.length >= MIN_COMMENT_LENGTH &&
            this.state.comment.length <= MAX_COMMENT_LENGTH)
          }
        >
          Submit
        </button>
      </div>
    </form>;
  }

  _handleSendForm(evt) {
    this.props.onSendForm(this.props.offerId, this.state);
    evt.preventDefault();
  }

  _handleChangeRating(evt) {
    this.setState({rating: parseInt(evt.target.value, 10)});
  }

  _handleChangeComment(evt) {
    this.setState({comment: evt.target.value});
  }

  _resetForm() {
    this.setState({rating: 0, comment: ``});
  }
  _showErrorMessage() {
    const ToggleErrorMessage = withPopupToggle(ErrorMessage, true);
    return this.props.error ? <ToggleErrorMessage message={this.props.error.message}/> : null;
  }
}

OfferForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  onSendForm: PropTypes.func,
  error: PropTypes.object,
  loadStatus: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  error: getCommentsError(state),
  loadStatus: getLoadStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSendForm: (id, commentObj) => {
    dispatch(Operation.saveCommentObj(id, commentObj));
  },
});

export {OfferForm};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
