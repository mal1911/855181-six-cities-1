export const transformHostForLoading = (obj) => {
  return {
    id: obj.id,
    isPro: obj[`is_pro`],
    name: obj.name,
    avatarUrl: obj[`avatar_url`],
  };
};

export const transformUserForLoading = (obj) => {
  return Object.assign({}, transformHostForLoading(obj), {email: obj.email});
};

export const transformCommentsForLoading = (obj) => {
  return {
    id: obj.id,
    user: Object.assign({}, transformHostForLoading(obj.user)),
    rating: obj.rating,
    comment: obj.comment,
    date: obj.date,
  };
};

export const transformOfferForLoading = (obj) => {
  return {
    id: obj.id,
    city: obj.city,
    previewImage: obj[`preview_image`],
    images: obj.images,
    title: obj.title,
    isFavorite: obj[`is_favorite`],
    isPremium: obj[`is_premium`],
    rating: obj.rating,
    type: obj.type,
    bedrooms: obj.bedrooms,
    maxAdults: obj[`max_adults`],
    price: obj.price,
    goods: obj.goods,
    host: transformHostForLoading(obj.host),
    description: obj.description,
    location: obj.location
  };
};
