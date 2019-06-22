import React from "react";
import {mount} from "enzyme";
import City from "./city";
import {citiesData} from "../../../mocks/mocks";

const mockEvent = {
  preventDefault() {
  }
};
describe(`e2e test City`, () => {
  it(`Simulating City title click`, () => {
    const handleClick = jest.fn();
    const city = mount(
        <City
          onClick={handleClick}
          cityObj={citiesData[0]}
          isActive={true}
        />
    );
    const cityLink = city.find(`.locations__item-link`);
    cityLink.simulate(`click`, mockEvent);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
