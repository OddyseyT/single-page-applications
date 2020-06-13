context("Form -- testing our form inputs", function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
    it("Pull up menu and submit form", function () {
        cy.get('[data-cy="orderform"]').click();
        cy.get('[data-cy="name"]').type("Elvis Costello").should("have.value", "Elvis Costello");
        
        cy.get('[data-cy="cheese"]').check().should("be.checked");
        cy.get('[data-cy="tomatoes"]').check().should("be.checked");  
        cy.get('[data-cy="lettuce"]').check().should("be.checked");  
        cy.get('[data-cy="hotSauce"]').check().should("be.checked");
        cy.get('[data-cy="sourCream"]').check().should("be.checked");
        cy.get('[data-cy="special"]').type("Pump it up, when you don't really need it.  Pump it up, so you can feel it")
        cy.get("[data-cy=submit]").click();
    })
});