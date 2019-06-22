import React from "react";
import {commentType} from "../../../prop-types";
import moment from "moment";

const OfferComment = ({commentObj}) => {
  return <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={commentObj.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
      </div>
      <span className="reviews__user-name">{commentObj.user.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${Math.round(commentObj.rating) * 20}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{commentObj.comment}</p>
      <time className="reviews__time" dateTime="2019-04-24">{moment(commentObj.date).format(`MMMM YYYY`)}</time>
    </div>
  </li>;
};

OfferComment.propTypes = {
  commentObj: commentType,
};

export default OfferComment;
