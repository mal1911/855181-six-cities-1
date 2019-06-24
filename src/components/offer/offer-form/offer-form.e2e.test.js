import React from "react";
import {shallow} from "enzyme";
import {OfferForm} from "./offer-form";

const mockEvent = {
  preventDefault() {
  }
};

describe(`e2e test OfferForm`, () => {
  it(`Simulating OfferForm submit`, () => {
    const handleSubmit = jest.fn();

    const form = shallow(
        <OfferForm
          offerId={1}
          onSendForm={handleSubmit}
          error={null}
          loadStatus={false}
        />
    );

    const offerForm = form.find(`.reviews__form`);
    offerForm.simulate(`submit`, mockEvent);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
