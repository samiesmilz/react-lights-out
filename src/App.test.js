import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app component", () => {
  render(<App />);
  const title = screen.getByText("Lets play lights-out");
  expect(title).toBeInTheDocument();
});
