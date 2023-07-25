import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { SelectInput } from "./SelectInput";

/**
 * url: https://stackoverflow.com/questions/41991077/testing-react-select-component
 */

const mockedOptions = [
  { label: "Mocked option 1", value: "mocked-option-1" },
  { label: "Mocked option 2", value: "mocked-option-2" },
  { label: "Mocked option 3", value: "mocked-option-3" },
  { label: "Mocked option 4", value: "mocked-option-4" },
  { label: "Mocked option 5", value: "mocked-option-5" },
  { label: "Mocked option 6", value: "mocked-option-6" },
  { label: "Mocked option 7", value: "mocked-option-7" },
  { label: "Mocked option 8", value: "mocked-option-8" },
  { label: "Mocked option 9", value: "mocked-option-9" },
  { label: "Mocked option 10", value: "mocked-option-10" },
];

describe("SelectInput", () => {
  it("renders", () => {
    const onChange = jest.fn();
    render(<SelectInput label={"the label"} onChange={onChange} />);

    expect(screen.getByText("the label")).toBeInTheDocument();
    const selectInput = screen.getByTestId("selectinput-input");
    expect(selectInput).toBeInTheDocument();
  });

  it("register onChange", () => {
    const onChange = jest.fn();
    render(
      <SelectInput
        label={"the label"}
        onChange={onChange}
        options={mockedOptions}
      />
    );

    const selectInput = screen.getByTestId("selectinput-input");
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.keyDown(selectInput.firstChild!, { key: "ArrowDown" });
    const firstOption = screen.getByText("Mocked option 1");
    fireEvent.click(firstOption, { key: "ArrowDown" });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
