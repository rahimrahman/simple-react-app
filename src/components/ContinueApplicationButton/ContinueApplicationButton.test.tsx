import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContinueApplicationButton } from "./ContinueApplicationButton";

describe("FormFieldWrapper", () => {
  const url = "http://dummy.com";
  Object.defineProperty(window, "location", {
    value: {
      href: url,
    },
    writable: true, // possibility to override
  });

  it("renders", () => {
    render(<ContinueApplicationButton />);
    const continueText = screen.getByText("Continue my application");
    expect(continueText).toBeInTheDocument();
  });

  it("navigate when click", () => {
    render(<ContinueApplicationButton />);
    fireEvent.click(screen.getByText("Continue my application"));
    expect(window.location.href).toBe(
      "https://my.virtahealth.com/apply/get-started"
    );
  });
});
