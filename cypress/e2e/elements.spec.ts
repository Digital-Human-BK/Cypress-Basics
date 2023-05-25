/// <reference types="cypress" />

describe("Elements suite", () => {
  it("Radio buttons", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).first().should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("Checkboxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]').eq(0).uncheck({ force: true });
  });

  it("Datepickers", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    function selectDayFromCurrent(days: number) {
      let date = new Date();
      date.setDate(date.getDate() + days);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString("default", {
        month: "short",
      });
      let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(days);
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });

      return dateAssert;
    }

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(200);

        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
      });
  });

  it.only("Lists and Dropdowns", () => {
    cy.visit("/");

    //1
    // cy.get("nav nb-select").click();
    // cy.get(".options-list").contains("Dark").click();
    // cy.get("nav nb-select").should("contain", "Dark");
    // cy.get("nb-layout-header nav").should(
    //   "have.css",
    //   "background-color",
    //   "rgb(34, 43, 69)"
    // );

    //2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((li, index, $collection) => {
        const itemText = li.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(li).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        if (index < $collection.length - 1) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });
});
