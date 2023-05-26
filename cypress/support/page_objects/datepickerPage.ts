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
        cy.get(".day-cell").not(".bounding-month").contains(futureDay).click();
      }
    });

  return dateAssert;
}

export const datepickerPage = {
  selectCommonDatepickerDateFromToday(dayFromToday: number) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(dayFromToday);

        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
        cy.wrap(input).should("have.value", dateAssert);
      });
  },
  selectDatePickerWithRangeFromToday(startDay: number, endDay: number) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssertStart = selectDayFromCurrent(startDay);
        let dateAssertEnd = selectDayFromCurrent(endDay);
        let dateRangeAssert = `${dateAssertStart} - ${dateAssertEnd}`;

        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", dateRangeAssert);
        cy.wrap(input).should("have.value", dateRangeAssert);
      });
  },
};
