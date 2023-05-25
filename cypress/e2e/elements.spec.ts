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

  it("Lists and Dropdowns", () => {
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

  it("Tables and rows", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1 Editing a row
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tr) => {
        cy.wrap(tr).find(".nb-edit").click();
        cy.wrap(tr).find('[placeholder="Age"]').clear().type("35");
        cy.wrap(tr).find(".nb-checkmark").click();
        cy.wrap(tr).find("td").eq(6).should("contain", "35");
      });

    //2 Adding new row
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tr) => {
        cy.wrap(tr).find('[placeholder="ID"]').type("99");
        cy.wrap(tr).find('[placeholder="First Name"]').type("Mike");
        cy.wrap(tr).find('[placeholder="Last Name"]').type("Shinoda");
        cy.wrap(tr).find('[placeholder="Username"]').type("MikeLP");
        cy.wrap(tr).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((td) => {
        cy.wrap(td).eq(1).should("contain", "99");
        cy.wrap(td).eq(2).should("contain", "Mike");
        cy.wrap(td).eq(3).should("contain", "Shinoda");
        cy.wrap(td).eq(4).should("contain", "MikeLP");
      });

    //3 Searching for a row
    const testAge = [20, 35, 40, 200];

    cy.wrap(testAge).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(`${age}`);
      cy.wait(500);
      cy.get("tbody tr").each((tr) => {
        if (Number(age) > 120) {
          cy.wrap(tr).should("contain", "No data found");
        } else {
          cy.wrap(tr).find("td").eq(6).should("contain", `${age}`);
        }
      });
    });
  });

  it.only("Tooltips and popups", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });
});
