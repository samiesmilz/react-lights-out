import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

test("renders without errors", () => {
  render(<Board nrows={3} ncols={3} chanceLightStartsOn />);
});

it("matches snapshot...", () => {
  const { asFragment } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("click event is triggered when cell is clicked", () => {
  const { container } = render(<Board nrows={3} ncols={3} />); // Adjust nrows and ncols accordingly

  // Get the first cell in the table (assuming it's the one you want to test)
  const cell = container.querySelector(".Board tr:first-child td:first-child");
  fireEvent.click(cell);
});
