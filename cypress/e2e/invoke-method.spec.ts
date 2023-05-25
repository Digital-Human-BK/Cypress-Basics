/// <reference types="cypress" />

describe("Invoke suite", () => {
  it.only("Invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="labelForEmail1"]')
      .should("contain", "Email address")
      .should("have.class", "label")
      .and("have.text", "Email address");

    cy.get('[data-cy="labelForEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
    });

    cy.get('[data-cy="labelForEmail1"]')
      .invoke("text")
      .then((label) => {
        expect(label).to.equal("Email address");
      });

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      // .should("contain", "checked");
      .then((classValue) => {
        expect(classValue).to.contain("checked");
      });
  });

  it("Invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("10").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "May 10, 2023");
      });
  });
});
