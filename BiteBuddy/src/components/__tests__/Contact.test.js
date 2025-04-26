import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact component test cases", () => {
  it("Should load Contact us Component", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");

    //   Assertion
    expect(heading).toBeInTheDocument();
  });

  it("Should load Button inside Contact component", () => {
    render(<Contact />);

    const button = screen.getByText("Submit");

    //   Assertion
    expect(button).toBeInTheDocument();
  });

  test("Should load input name inside Contact component", () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText("Enter your name");

    //   Assertion
    expect(inputName).toBeInTheDocument();
  });

  test("Should load 2 input boxes on the Contact component", () => {
    render(<Contact />);

    //   Querying
    const inputBoxes = screen.getAllByRole("textbox");

    // This will log the DOM Element
    // console.log(inputBoxes);

    //   Assertion
    expect(inputBoxes).toHaveLength(2);
  });
});
