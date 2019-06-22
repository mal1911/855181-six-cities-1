import React from "react";
import renderer from "react-test-renderer";
import OfferComment from "./offer-comment";
import {commentsData} from "../../../mocks/mocks";

it(`OfferComment correctly renders`, () => {
  const tree = renderer
    .create(<OfferComment
      commentObj={commentsData[0]}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
