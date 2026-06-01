Cypress.Commands.add('deleteUsuario', (email) => {
    cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios',
        qs: {
            email: email
        }
    }).then((response) => {
        cy.request({
            method: 'DELETE',
            url: `https://serverest.dev/usuarios/${response.body.usuarios[0]._id}`,
        })
    })
})

Cypress.Commands.add('deleteProduto', (nome) => {
    cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos',
        qs: {
            nome: nome
        }
    }).then((response) => {
        cy.request({
            method: 'DELETE',
            url: `https://serverest.dev/produtos/${response.body.produtos[0]._id}`,
        })
    })
})

Cypress.Commands.add('apiLogin', (email, senha) => {
    cy.request('POST', 'https://serverest.dev/login', {
        email: email,
        password: senha
    }).then((response) => {
        const token = response.body.authorization
        window.localStorage.setItem(
            'serverest/userToken',
            token
        )
    })
})

Cypress.Commands.add('apiCadastro', (nome, email, senha, adm) => {
    cy.request('POST', 'https://serverest.dev/usuarios', {
        nome: nome,
        email: email,
        password: senha,
        administrador: adm
    }).then((response) => {
        const token = response.body.authorization
        window.localStorage.setItem(
            'serverest/userToken',
            token
        )
    })
})