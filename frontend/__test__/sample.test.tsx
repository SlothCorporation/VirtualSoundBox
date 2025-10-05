import { render, screen } from "@testing-library/react";
import React from "react";

describe("Sample Test", () => {
  it("renders text", () => {
    render(<div>Hello, Jest!</div>);
    expect(screen.getByText("Hello, Jest!")).toBeInTheDocument();
  });
});
