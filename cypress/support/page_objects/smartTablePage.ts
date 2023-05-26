export const smartTablePage = {
  updateAgeByFirstName(name: string, age: string) {
    cy.get("tbody")
      .contains("tr", name)
      .then((tr) => {
        cy.wrap(tr).find(".nb-edit").click();
        cy.wrap(tr).find('[placeholder="Age"]').clear().type(age);
        cy.wrap(tr).find(".nb-checkmark").click();
        cy.wrap(tr).find("td").eq(6).should("contain", age);
      });
  },
  addNewRecordWithFirstAndLastName(firstName: string, lastName: string) {
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tr) => {
        cy.wrap(tr).find('[placeholder="First Name"]').type(firstName);
        cy.wrap(tr).find('[placeholder="Last Name"]').type(lastName);
        cy.wrap(tr).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((td) => {
        cy.wrap(td).eq(2).should("contain", firstName);
        cy.wrap(td).eq(3).should("contain", lastName);
      });
  },
  deleteRowByIndex(index: number) {
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .eq(index)
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });
  },
};
