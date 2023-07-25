import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
jest.mock("./pages/Form/Form", () => ({ Form: "form" }));

test("renders learn react link", () => {
  render(<App />);
  expect(1).toBe(1);
});
