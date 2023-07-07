import { render, screen } from "@testing-library/react";
import Compose from "./Compose";

describe("Compose Component", () => {
  test("contain to text", () => {
    render(<Compose />);
    const element = screen.getByText("To:");
    expect(element).toBeInTheDocument();
  });
});
