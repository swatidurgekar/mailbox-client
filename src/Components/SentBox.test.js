import { render, screen } from "@testing-library/react";
import SentBox from "./SentBox";
import { Provider } from "react-redux";
import store from "../Store/Store";
import { BrowserRouter } from "react-router-dom";

describe("SentBox Component", () => {
  test("contain sent text", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SentBox />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.getByText("SENT");
    expect(element).toBeInTheDocument();
  });
});
