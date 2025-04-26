import { fireEvent, render, screen } from "@testing-library/react";
import ResMenu from "../ResMenu";
import { act } from "react";
import MOCK_DATA from "../mockData/ResMenuMock.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";
import Header from "../Header";
import Cart from "../Cart";
import { BrowserRouter } from "react-router";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
    ok: true,
  })
);

it("should load Restaurant Menu Component & Add Menu Items in Cart", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
          <ResMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    );
  });

  expect(screen.getByText("Cart (0)")).toBeInTheDocument();

  const addBtn = screen.getAllByText("➕");
  //   console.log(addBtn);
  fireEvent.click(addBtn[0]);
  expect(screen.getByText("Cart (1)")).toBeInTheDocument();

  fireEvent.click(addBtn[1]);
  expect(screen.getByText("Cart (2)")).toBeInTheDocument();
});

it("should order the Cart items", async () => {
  // Mocking the window.alert function
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  await act(async () => {
    render(
      <Provider store={appStore}>
        <Cart />
      </Provider>
    );
  });

  const orderBtn = screen.getByRole("button", { name: "Order" });
  fireEvent.click(orderBtn);

  // Verify that alert was called
  expect(alertMock).toHaveBeenCalledTimes(1); // Expect alert to be called once

  // Optionally check the content of the alert
  // expect(alertMock).toHaveBeenCalledWith("Your order has been placed!");

  // Clean up the mock
  alertMock.mockRestore();
});

it("should load Cart Component & Clear cart", async () => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <Cart />
      </Provider>
    );
  });

  const clearCartBtn = screen.getByRole("button", { name: "Clear Cart" });
  expect(clearCartBtn).toBeInTheDocument();

  const resMenu = screen.getAllByTestId("resMenu");
  expect(resMenu.length).toBe(2);

  fireEvent.click(clearCartBtn);
  expect(
    screen.getByText("Please add something in Cart!!")
  ).toBeInTheDocument();
});
