import { render, screen } from "@testing-library/react";
import ResCard, { withLabel } from "../ResCard";
import MOCK_DATA from "../mockData/ResCardMock.json";
import "@testing-library/jest-dom";

// beforeAll(() => {
//   console.log("beforeAll");
// });

// beforeEach(() => {
//   console.log("before Each");
// });

// afterEach(() => {
//   console.log("after Each");
// });

// afterAll(() => {
//   console.log("after All");
// });

it("Should render ResCard component with Props data", () => {
  render(<ResCard resData={MOCK_DATA} />);

  const resName = screen.getByText("Subway");

  expect(resName).toBeInTheDocument();
});

it("should render ResCard component with Top Label", () => {
  // Test Higher order function withLabel()
  render(withLabel(ResCard)({ resData: MOCK_DATA }));

  const label = screen.getByText("Top");

  expect(label).toBeInTheDocument();
});
