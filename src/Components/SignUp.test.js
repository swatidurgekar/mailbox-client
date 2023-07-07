import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";

describe("SignUp component", () => {
  test("contain email text", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
    const element = screen.getByText("Email");
    expect(element).toBeInTheDocument();
  });
});
