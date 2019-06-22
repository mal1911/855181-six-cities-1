import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Cards} from "./cards";
import {offersData} from "../../../mocks/mocks";

it(`Cards correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Cards
        resultOffersData={offersData}
        onChangeActiveCard={jest.fn()}
      />
    </BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
