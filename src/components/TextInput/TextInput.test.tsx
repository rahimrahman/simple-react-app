import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders", () => {
    render(<TextInput label={"the label"} />);

    const labelText = screen.getByText("the label");
    expect(labelText).toBeInTheDocument();
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders date", () => {
    render(<TextInput type="date" label={"the label"} />);

    const input = screen.getByTestId("textinput-input");
    expect(input).toHaveProperty("type", "date");
  });

  it("changes value", () => {
    render(<TextInput label={"the label"} />);

    const input = screen.getByTestId("textinput-input");
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "the value" } });
    expect(input).toHaveValue("the value");
  });

  it("renders error", () => {
    render(<TextInput label={"the label"} error={"the error"} />);

    const errorText = screen.getByText("the error");
    expect(errorText).toBeInTheDocument();
  });
});
