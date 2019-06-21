import React from "react";
import renderer from "react-test-renderer";
import {FavoritesItem} from "./favorites-item";
import {BrowserRouter} from "react-router-dom";
import {offersData, favoritesData, favoritesOneData} from "../../../mocks/mocks";

it(`FavoritesItem correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter><FavoritesItem
      favoritesData={favoritesData}
      offersData={offersData}
      favoritesOneData={favoritesOneData}
      onChangeFavoriteStatus={jest.fn()}
      onChangeActiveCard={jest.fn()}
    /></BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
