import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import * as NetworkFunctions from "../../utils/networkRequests";
import { Form } from "./Form";

describe("Form", () => {
  beforeEach(() => {
    jest.spyOn(NetworkFunctions, "getPayors").mockResolvedValue([]);
    jest.clearAllMocks();
  });

  const fillFormFields = () => {
    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "Rahim" },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: "Rahman" },
    });
    fireEvent.change(screen.getByTestId("date-of-birth-input"), {
      target: { value: "1980-01-01" },
    });

    const selectInput = screen.getByTestId("insurance-input");
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.keyDown(selectInput.firstChild!, { key: "ArrowDown" });
    const firstOption = screen.getAllByText(/Blue Cross Blue Shields/i);
    fireEvent.click(firstOption[0], { key: "ArrowDown" });

    fireEvent.change(screen.getByTestId("member-id-input"), {
      target: { value: "2" },
    });
  };

  it("renders button", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={jest.fn()} />));

    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    const onSubmit = jest.fn();
    const trackAmplitudeSpy = jest.spyOn(
      NetworkFunctions,
      "trackSubmissionAmplitude"
    );
    const postRequestSpy = jest
      .spyOn(NetworkFunctions, "postEligibilityValidation")
      .mockResolvedValue(true);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={onSubmit} />));

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "rahim.rahman@virtahealth.com" },
    });
    fillFormFields();

    const checkEligibilityButton = screen.getByTestId("submit-button");
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => fireEvent.click(checkEligibilityButton));

    expect(postRequestSpy).toHaveBeenCalled();
    expect(trackAmplitudeSpy).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("render error message then dissapear as input being entered or selected", async () => {
    const onSubmit = jest.fn();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={onSubmit} />));

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);

    expect(screen.getByText("First Name is required")).toBeInTheDocument();
    expect(screen.getByText("Insurer is required")).toBeInTheDocument();
    expect(onSubmit).not.toBeCalled();

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "Rahim" },
    });
    expect(
      screen.queryByText("First Name is required")
    ).not.toBeInTheDocument();

    const selectInput = screen.getByTestId("insurance-input");
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.keyDown(selectInput.firstChild!, { key: "ArrowDown" });
    const anOption = screen.getByText("Anthem");
    fireEvent.click(anOption, { key: "ArrowDown" });
    expect(screen.queryByText("Insurer is required")).not.toBeInTheDocument();
  });

  it("submits the form with email which will result in patient not covered", async () => {
    const onSubmit = jest.fn();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={onSubmit} />));

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "show.not.covered@virtahealth.com" },
    });
    fillFormFields();

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);

    expect(onSubmit).toBeCalledWith(false);
  });

  it("submits the form and show loading spinner", async () => {
    jest.useFakeTimers();
    const onSubmit = jest.fn();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={onSubmit} />));

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "show.loading.2000@virtahealth.com" },
    });
    fillFormFields();

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);

    expect(screen.getByText(/Checking/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onSubmit).toBeCalledWith(true);
    jest.useRealTimers();
  });

  it("submits the form with invalid member ID", async () => {
    const onSubmit = jest.fn();
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={onSubmit} />));

    fillFormFields();

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "rahim.rahman@virtahealth.com" },
    });

    fireEvent.change(screen.getByTestId("member-id-input"), {
      target: { value: "ABC-123" },
    });

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);

    expect(
      screen.getByText("Member ID should be numbers and letters only")
    ).toBeInTheDocument();
  });

  it("renders correct error when not entering any text", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={jest.fn()} />));

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);
    expect(screen.getByText("First Name is required")).toBeInTheDocument();
  });

  it("renders correct error when using invalid email", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={jest.fn()} />));

    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(emailInput, { target: { value: "invalid email" } });

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);
    expect(
      screen.getByText("Please enter a valid email address")
    ).toBeInTheDocument();
  });

  it("renders correct select input on production", async () => {
    const oldEnv = process.env;
    // @ts-ignore-next-line
    process.env.REACT_APP_ENV = "production";

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => render(<Form onSubmit={jest.fn()} />));

    const selectInput = screen.getByTestId("insurance-input");
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.keyDown(selectInput.firstChild!, { key: "ArrowDown" });
    const anOption = screen.queryByText(/Blue Cross Blue Shields/i);
    expect(anOption).not.toBeInTheDocument();

    process.env = oldEnv;
  });
});
