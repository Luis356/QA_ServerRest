const { fail } = require("assert-plus")
const { method } = require("bluebird")

Cypress.Commands.add('campos', (nome, email, password, admin) => {
    cy.get('#nome').type(nome)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    if (admin) {
        cy.get('#administrador').check()
    } else {
        cy.get('#administrador').uncheck()
    }
})