import { render } from "@testing-library/react";
import Cell from "./Cell";

test("renders without errors", () => {
  render(
    <Cell
      key={`${0}-${0}`}
      flipCellsAroundMe={() => Cell.flipCellsAround(`${0}-${0}`)}
      isLit={false}
    />
  );
});

it("matches snapshot...", () => {
  const { asFragment } = render(
    <Cell
      key={`${0}-${0}`}
      flipCellsAroundMe={() => Cell.flipCellsAround(`${0}-${0}`)}
      isLit={false}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
