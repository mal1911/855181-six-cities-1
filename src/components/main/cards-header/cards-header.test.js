import React from "react";
import renderer from "react-test-renderer";
import {CardsHeader} from "./cards-header";
import {offersData} from "../../../mocks/mocks";

it(`CardsHeader correctly renders`, () => {
  const tree = renderer
    .create(<CardsHeader
      activeCityName={offersData[0].city.name}
      countResultOffers={10}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
