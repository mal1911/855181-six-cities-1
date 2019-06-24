import React from "react";
import {shallow} from "enzyme";
import {OfferWrapper} from "./offer-wrapper";
import {offersData, favoritesData, offersLocationsData} from "../../../mocks/mocks";

const mockEvent = {
  preventDefault() {
  }
};
describe(`e2e test OfferWrapper`, () => {
  it(`Simulating Button click`, () => {
    let activeOfferObj = {};
    const handleClick = () => {
      activeOfferObj = offersData[0];
    };
    const comp = shallow(
        <OfferWrapper
          offerObj={offersData[0]}
          nearData={offersData.slice(0, 3)}
          offersData={offersData}
          favoritesData={favoritesData}
          error={null}
          nearLocationsData={offersLocationsData.slice(0, 3)}
          onChangeFavoriteStatus={handleClick}
          onChangeActiveCard={jest.fn()}
        />
    );

    const button = comp.find(`.property__bookmark-button`);
    button.simulate(`click`, mockEvent);
    expect(activeOfferObj).toEqual(offersData[0]);
  });

});
