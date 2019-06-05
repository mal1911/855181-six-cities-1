import {combineReducers} from "redux";
import {reducer as offersData} from "./offers-data/offers-data";
import {reducer as favoritesData} from "./favorites-data/favorites-data";
import {reducer as user} from "./user/user";
import NameSpace from "./name-spaces";

export default combineReducers({
  [NameSpace.OFFERS_DATA]: offersData,
  [NameSpace.FAVORITES_DATA]: favoritesData,
  [NameSpace.USER]: user,
});
