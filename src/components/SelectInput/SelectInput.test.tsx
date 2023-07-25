import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SelectInput } from "./SelectInput";

describe("SelectInput", () => {
  it("renders", () => {
    const onChange = jest.fn();
    render(<SelectInput label={"the label"} onChange={onChange} />);

    const selectInput = screen.getByTestId("selectinput-input");
    expect(selectInput).toBeInTheDocument();
  });

  it("register onChange", () => {
    const onChange = jest.fn();
    render(<SelectInput label={"the label"} onChange={onChange} />);

    const selectInput = screen.getByTestId("selectinput-input");
    fireEvent.change(selectInput, { target: { value: "2" } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
