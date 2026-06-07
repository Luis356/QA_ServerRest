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

Cypress.Commands.add('validaAdm', (usuario, email, adm) => {
    cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios',
        qs: {
            nome: usuario,
            email: email
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        var administrador_response = response.body.usuarios[0].administrador

        if (adm === 'sim') {
            expect(administrador_response).to.be.equal('true')
        } else {
            expect(administrador_response).to.be.equal('false')
        }
    })
})