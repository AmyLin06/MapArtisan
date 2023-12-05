describe("register spec", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("https://mapartisan.onrender.com/register"); // Adjust the URL to your login page
  });
  it("Dont allows the user to register as the user dont fill in all text field", () => {
    cy.get('input[name="firstname"]').type("2345");
    cy.get('input[name="lastname"]').type("2345");
    cy.get('input[name="email"]').type("2345@gmail.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="passwordverified"]').type("12345678");
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should("be.visible");
    cy.contains("Failed to register").should("be.visible");
    cy.contains("Please enter all required fields.").should("be.visible");
  });

  it("Dont allows the user to register as password not match", () => {
    cy.get('input[name="username"]').type("2345");
    cy.get('input[name="firstname"]').type("2345");
    cy.get('input[name="lastname"]').type("2345");
    cy.get('input[name="email"]').type("2345@gmail.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="passwordverified"]').type("87654321");
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should("be.visible");
    cy.contains("Failed to register").should("be.visible");
    cy.contains("Please enter the same password twice.").should("be.visible");
  });
  it("Dont allows the user to register as password not long enough", () => {
    cy.get('input[name="username"]').type("2345");
    cy.get('input[name="firstname"]').type("2345");
    cy.get('input[name="lastname"]').type("2345");
    cy.get('input[name="email"]').type("2345@gmail.com");
    cy.get('input[name="password"]').type("1234567");
    cy.get('input[name="passwordverified"]').type("1234567");
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should("be.visible");
    cy.contains("Failed to register").should("be.visible");
    cy.contains("Please enter a password of at least 8 characters.").should(
      "be.visible"
    );
  });
  it("Dont allows the user to register as An account with this email address already exists.", () => {
    cy.get('input[name="username"]').type("2345");
    cy.get('input[name="firstname"]').type("2345");
    cy.get('input[name="lastname"]').type("2345");
    cy.get('input[name="email"]').type("2345@gmail.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('input[name="passwordverified"]').type("12345678");
    cy.get('button[type="submit"]').click();
    cy.get('[role="alert"]').should("be.visible");
    cy.contains("Failed to register").should("be.visible");
    cy.contains("An account with this email address already exists.").should(
      "be.visible"
    );
  });
});
