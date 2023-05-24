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

  //only runs this test
  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInBtn"]');

    cy.contains("Sign in");

    //getting specific element among elements with same text content
    cy.contains('[status="warning"]', "Sign in");

    //find element by parent relation
    cy.get("#inputEmail3").parents("form").find("button");
    //same as above but with added assertion
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in");

    //traveling back to parent and then finding child
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it.only("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    cy.contains("nb-card", "Basic form")
      .find('[for="exampleInputEmail1"]')
      .should("contain", "Email address");
    cy.contains("nb-card", "Basic form")
      .find('[for="exampleInputPassword1"]')
      .should("contain", "Password");

    cy.contains("nb-card", "Using the Grid").then((firstElement) => {
      const emailLabel = firstElement.find('[for="inputEmail1"]').text();
      const passwordLabel = firstElement.find('[for="inputPassword2"]').text();
      expect(emailLabel).to.equal("Email");
      expect(passwordLabel).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondElement) => {
        // The .then cb parameters are JQuery objects and are using chai methods
        const passwordLabelSecond = secondElement
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabel).to.equal(passwordLabelSecond);

        //to change the context back to cypress - use .wrap() around the JQ object
        cy.wrap(secondElement)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });
});
