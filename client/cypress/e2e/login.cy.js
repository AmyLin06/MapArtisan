describe("login spec", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("https://mapartisan.onrender.com/login"); // Adjust the URL to your login page
  });
  it("allows the user to log in", () => {
    // Find the email input field and type in an email
    cy.get('input[name="email"]').type("ronghao20010322@gmail.com");
    // Find the password input field and type in a password
    cy.get('input[name="password"]').type("20010322");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");
    cy.get('[role="alert"]').should("be.visible");
    cy.contains("Sucessfully login").should("be.visible");
  });
  it("failed to login as wrong email or password provided.", () => {
    cy.get('input[name="email"]').type("ronghao20010322@gmail.com");
    cy.get('input[name="password"]').type("11111111");
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should("be.visible");
    cy.contains("Failed to login").should("be.visible");
    cy.contains("Wrong email or password provided.").should("be.visible");
  });
  it("allows the user to log in", () => {
    cy.get('input[name="password"]').type("11111111");
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should("be.visible");
    cy.contains("Failed to login").should("be.visible");
    cy.contains("Please enter all required fields.").should("be.visible");
  });
});
