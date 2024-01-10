describe("e2e google login", () => {
  it("renders needed elements", () => {
    cy.visit("/");
    cy.get('[data-testid="cypress-google-signin-button"]').should("exist");
  });

  it("logs in with google", () => {
    cy.visit("/");
    cy.get('[data-testid="cypress-google-signin-button"]').click();
    cy.get("button.button").click();
  });
});
