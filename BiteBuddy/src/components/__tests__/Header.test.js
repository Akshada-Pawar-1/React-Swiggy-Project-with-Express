import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";

describe("All test cases for Header component", () => {
  it("Should render Header component with Login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // If there are multiple buttons & We want to find specific button
    const loginButton = screen.getByRole("button", { name: "Login" });

    // const loginButton = screen.getByText("Login");

    expect(loginButton).toBeInTheDocument();
  });

  it("Should render Header component with Cart (0) button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // You can pass regex while passing the text
    const loginButton = screen.getByText(/Cart/);

    // const loginButton = screen.getByText("Cart (0)");

    expect(loginButton).toBeInTheDocument();
  });

  it("Should change Login button to Logout on click", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", { name: "Logout" });

    expect(logoutButton).toBeInTheDocument();
  });
});
