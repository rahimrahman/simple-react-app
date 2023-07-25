import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";

describe("CheckEligibilityButton", () => {
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

  it("renders button", () => {
    render(<Form onSubmit={jest.fn()} />);
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
  });

  it("submits the form successfully", () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "rahim.rahman@virtahealth.com" },
    });
    fillFormFields();

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);

    expect(onSubmit).toBeCalledWith(true);
  });

  it("submits the form with email which will result in patient not covered", () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

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
    render(<Form onSubmit={onSubmit} />);

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

  it("submits the form with invalid member ID", () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

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
    render(<Form onSubmit={jest.fn()} />);

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);
    expect(screen.getByText("First Name is required")).toBeInTheDocument();
  });

  it("renders correct error when using invalid email", async () => {
    render(<Form onSubmit={jest.fn()} />);

    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(emailInput, { target: { value: "invalid email" } });

    const checkEligibilityButton = screen.getByTestId("submit-button");
    fireEvent.click(checkEligibilityButton);
    expect(
      screen.getByText("Please enter a valid email address")
    ).toBeInTheDocument();
  });
});
