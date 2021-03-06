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
  isPro: PropTypes.bool,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
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
