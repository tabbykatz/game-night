import * as React from "react";

import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";

import Nav from "../Nav";

afterEach(cleanup);

describe("Nav", () => {
  test("renders login", () => {
    render(<Nav />);
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });
});
