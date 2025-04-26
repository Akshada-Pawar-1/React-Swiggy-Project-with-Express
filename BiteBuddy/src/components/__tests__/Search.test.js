import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Body } from "../Body";
import MOCK_DATA from "../mockData/ResListMock.json";
import { act } from "react";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";

global.alert = jest.fn();

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
    // Here adding ok:true also made big difference as it's chcking whether data we're receiving is ok or not
    ok: true,
  });
});

it("should Search for the text that's written in Input box", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  );

  const listBeforeSearch = screen.getAllByTestId("resCard");
  expect(listBeforeSearch.length).toBe(20);

  // Here I just added await & test failing with error started passing (Error was unable to Search button in Body)
  const searchBtn = await screen.findByRole("button", { name: "Search" });
  //   console.log(searchBtn);

  const searchInput = screen.getByTestId("searchInput");
  //   console.log(searchInput);

  fireEvent.change(searchInput, { target: { value: "Burger" } });
  fireEvent.click(searchBtn);

  expect(searchBtn).toBeInTheDocument();

  //   Screen should load 2 cards
  const listAfterSearch = screen.getAllByTestId("resCard");
  expect(listAfterSearch.length).toBe(2);
});

it("should Filter the restaurant list", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const listBeforeFilter = screen.getAllByTestId("resCard");
  expect(listBeforeFilter.length).toBe(20);

  const filterBtn = await screen.findByRole("button", {
    name: "Top Rated Restaurants",
  });
  //   console.log(filterBtn);

  fireEvent.click(filterBtn);

  const listAfterFilter = screen.getAllByTestId("resCard");
  expect(listAfterFilter.length).toBe(4);
});
