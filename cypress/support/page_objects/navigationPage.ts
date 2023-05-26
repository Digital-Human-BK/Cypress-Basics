function selectGroupMenuItem(groupName) {
  cy.contains("a", groupName).then((menu) => {
    cy.wrap(menu)
      .find(".expand-state g g")
      .invoke("attr", "data-name")
      .then((attr) => {
        if (attr.includes("left")) {
          cy.wrap(menu).click();
        }
      });
  });
}

export const navigateTo = {
  formLayoutPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Form Layouts").click();
  },
  datepickerPage() {
    selectGroupMenuItem("Forms");
    cy.contains("Datepicker").click();
  },
  toasterPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Toastr").click();
  },
  tooltipPage() {
    selectGroupMenuItem("Modal & Overlays");
    cy.contains("Tooltip").click();
  },
  smartTablePage() {
    selectGroupMenuItem("Tables & Data");
    cy.contains("Smart Table").click();
  },
};
