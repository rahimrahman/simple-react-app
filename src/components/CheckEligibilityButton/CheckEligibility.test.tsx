import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ArrowSVG, CheckEligibilityButton } from "./CheckEligibilityButton";

describe("CheckEligibilityButton", () => {
  it("renders button", () => {
    render(<CheckEligibilityButton />);
    const eligibilityText = screen.getByText("Check");
    expect(eligibilityText).toBeInTheDocument();
  });

  it("renders Checking Eligibility...", () => {
    render(<CheckEligibilityButton isLoading />);
    const eligibilityText = screen.getByText(/Checking/i);
    expect(eligibilityText).toBeInTheDocument();
  });

  it("renders different color when hovering over button", () => {
    render(<CheckEligibilityButton />);
    const submitButton = screen.getByTestId("submit-button");
    const arrow = screen.getByTestId("icon");

    fireEvent.mouseEnter(submitButton);

    // eslint-disable-next-line testing-library/no-node-access
    expect(arrow.children[0].children[0].getAttribute("stroke")).toEqual(
      "#82D8AF"
    );
  });
});

describe("ArrowSVG", () => {
  it("renders arrow", () => {
    render(<ArrowSVG />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByRole("img").children[0].getAttribute("stroke")).toEqual(
      "white"
    );
  });
});
