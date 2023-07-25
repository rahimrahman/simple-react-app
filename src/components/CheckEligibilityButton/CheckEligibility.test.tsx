import React from "react";
import { render, screen } from "@testing-library/react";
import { CheckEligibilityButton } from "./CheckEligibilityButton";

describe("CheckEligibilityButton", () => {
  it("renders button", () => {
    render(<CheckEligibilityButton />);
    const eligibilityText = screen.getByText(/Eligibility/i);
    expect(eligibilityText).toBeInTheDocument();
  });

  it("renders Loading... when loading", () => {
    render(<CheckEligibilityButton isLoading />);
    const eligibilityText = screen.getByText(/Checking/i);
    expect(eligibilityText).toBeInTheDocument();
  });
});
