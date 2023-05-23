/// <reference types="cypress" />

describe("My first suite", () => {
  it("first test", () => {
    //provide a URL for Cypress to visit
    //I have default URL set, so we pass only '/'
    cy.visit("/");
    //to navigate trough the app to a specific page
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by Tag Name
    cy.get("input");

    //by ID
    cy.get("#inputEmail");

    //by Class Name
    cy.get(".input-full-width");

    //by Attribute Name
    cy.get("[placeholder]");

    //by Attribute value
    cy.get('[placeholder="Email"]');

    //by Class value, requires all the class names
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]');

    //by two different Attributes
    cy.get('[placeholder="Email"][fullWidth]');

    //by Tag name, Attribute with value, ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail.input-full-width');

    //THE MOST RECOMMENDED WAY BY CYPRESS
    cy.get('[data-cy="imputEmail1"]');
  });
});
