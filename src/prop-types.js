import PropTypes from "prop-types";

export const locationType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
});

export const cityType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  location: locationType.isRequired,
});

export const hostType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
});

export const offerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  city: cityType.isRequired,
  previewImage: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired),
  title: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string.isRequired),
  host: hostType.isRequired,
  description: PropTypes.string.isRequired,
  location: locationType.isRequired
});

export const commentType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: hostType.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
});


  /*

 {
    id: 1,
    user: {
      id: 4,
      is_pro: false,
      name: "Max",
      avatar_url: "img/1.png"
    },
    rating: 4,
    comment: "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
    date: "2019-05-08T14:13:56.569Z"
  }

    export const hostType = PropTypes.shape({
      id: PropTypes.number.isRequired,
      [`is_pro`]: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      [`avatar_url`]: PropTypes.string.isRequired,
    });

    export const offerType = PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: cityType.isRequired,
      [`preview_image`]: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string.isRequired),
      title: PropTypes.string.isRequired,
      [`is_favorite`]: PropTypes.bool.isRequired,
      [`is_premium`]: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
      bedrooms: PropTypes.number.isRequired,
      [`max_adults`]: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      goods: PropTypes.arrayOf(PropTypes.string.isRequired),
      host: hostType.isRequired,
      description: PropTypes.string.isRequired,
      location: locationType.isRequired
    });
  */
