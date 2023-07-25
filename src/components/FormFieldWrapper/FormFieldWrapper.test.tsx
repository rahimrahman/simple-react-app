import React from "react";
import { render, screen } from "@testing-library/react";
import { FormFieldWrapper } from "./FormFieldWrapper";

describe("FormFieldWrapper", () => {
  it("renders", () => {
    render(
      <FormFieldWrapper label="the label">
        <div>the children</div>
      </FormFieldWrapper>
    );
    const labelText = screen.getByText(/the label/i);
    const childrenText = screen.getByText(/the children/i);
    expect(labelText).toBeInTheDocument();
    expect(childrenText).toBeInTheDocument();
  });

  it("renders error", () => {
    render(
      <FormFieldWrapper label="the label" error="the error">
        <div>the children</div>
      </FormFieldWrapper>
    );
    const errorText = screen.getByText(/the error/i);
    expect(errorText).toBeInTheDocument();
  });
});
