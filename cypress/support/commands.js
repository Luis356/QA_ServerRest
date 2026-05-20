const { fail } = require("assert-plus")
const { method } = require("bluebird")

var BaseURL = 'https://front.serverest.dev'
const usuarios = {
    admin: {
        nome: 'Teste Admin',
        email: 'Teste_admin@example.dev',
        password: 'admin',
        admin: 'true'
    },
    usuario: {
        email: 'Teste_usuario@example.dev',
        password: 'usuario'
    }
}

Cypress.Commands.add('pagina', (url) => {
    cy.visit(BaseURL + url)
})


Cypress.Commands.add('garanteLogin', (tipoPerfil) => {
    const usuario = usuarios[tipoPerfil]

    cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        failOnStatusCode: false,
        body: { email: usuario.email, password: usuario.password }
    
    }).then((response) => {
        if (response.status === 200) {
            return
        }
    })

    cy.request('POST', 'https://serverest.dev/login', {
        email: usuario.email,
        password: usuario.password

    })
})

Cypress.Commands.add('fazLogin', (tipoPerfil) => {

    cy.request('POST', 'https://serverest.dev/login', {
        email: usuarios[tipoPerfil].email,
        password: usuarios[tipoPerfil].password

    }).then((response) => {

        const token = response.body.authorization

        window.localStorage.setItem(
            'serverest/userToken',
            token
        )
    })

})

Cypress.Commands.add('campos', (nome, email, password, administrador) => {

    cy.get('#nome').type(nome)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    if (administrador === true) {
        cy.get('#administrador').check()
    } else {
        cy.get('#administrador').uncheck()
    }
})