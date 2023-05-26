import { navigateTo } from "../support/page_objects/navigationPage";
import { formLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { datepickerPage } from "../support/page_objects/datepickerPage";
import { smartTablePage } from "../support/page_objects/smartTablePage";

describe("Test with page objects", () => {
  beforeEach("open application", () => {
    cy.openIndexPage();
  });

  it("verify navigation across the pages", () => {
    navigateTo.formLayoutPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
  });

  it.only("Should submit Inline and Basic forms and select tomorrows date in the calendar", () => {
    navigateTo.formLayoutPage();
    formLayoutsPage.submitInlineFormWithNameAndEmail("John", "john@mail.com");
    formLayoutsPage.submitBasicFormWithEmailAndPassword("john@mail.com", "111");

    navigateTo.datepickerPage();
    datepickerPage.selectCommonDatepickerDateFromToday(1);
    datepickerPage.selectDatePickerWithRangeFromToday(5, 10);

    navigateTo.smartTablePage();
    smartTablePage.updateAgeByFirstName("Larry", "35");
    smartTablePage.addNewRecordWithFirstAndLastName("Mike", "Shinoda");
    smartTablePage.deleteRowByIndex(0);
  });
});
