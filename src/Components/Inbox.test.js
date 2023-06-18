import { render, screen } from "@testing-library/react";
import Inbox from "./Inbox";
import { Provider } from "react-redux";
import Store from "../Store/Store";
import { BrowserRouter } from "react-router-dom";

describe("ReadMessages Component", () => {
  test("contains text message", () => {
    render(
      <Provider store={Store}>
        <BrowserRouter>
          <Inbox />
        </BrowserRouter>
      </Provider>
    );
    const message = screen.getByText("INBOX");
    expect(message).toBeInTheDocument();
  });
});
