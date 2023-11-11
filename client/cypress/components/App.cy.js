import React from "react";
import App from "../../src/App";

describe("<App />", () => {
  it("renders", () => {
    cy.mount(<App />);
  });
});
