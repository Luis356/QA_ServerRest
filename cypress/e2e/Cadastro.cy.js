describe('Cadastro de usuário', () => {
  it('Cadastro de usuário regular com sucesso', () => {
    cy.intercept('POST', '**/usuarios').as('cadastroRegular')
    cy.pagina('/cadastrarusuarios')
    cy.campos('Leãozinho', 'leaozinhou@example.com', 'senha123', false)
    cy.get('[data-testid="cadastrar"]').click()

    cy.wait('@cadastroRegular').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
      const userId = interception.response.body._id
      cy.contains('Cadastro realizado com sucesso').should('be.visible')
      cy.request('DELETE', `https://serverest.dev/usuarios/${userId}`).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  }) // Teste para cadastro de usuário regular (Exclui usuário no final do teste) - FUNCIONANDO

  it('Cadastro de usuário admin com sucesso', () => {
    cy.intercept('POST', '**/usuarios').as('cadastroAdmin')
    cy.pagina('/cadastrarusuarios')
    cy.campos('Victorino Salina', 'victorino.salina1@example.com', 'senha123', true)
    cy.get('[data-testid="cadastrar"]').click()

    cy.wait('@cadastroAdmin').then((interception) => {
      expect(interception.response.statusCode).to.eq(201)
      const userId = interception.response.body._id
      cy.contains('Cadastro realizado com sucesso').should('be.visible')

      cy.request('DELETE', `https://serverest.dev/usuarios/${userId}`).then((response) => {
        expect(response.status).to.eq(200)
      })
  
    })
  }) // Teste para cadastro de usuário admin - FUNCIONANDO

  it('Cadastro sem sucesso - sem credenciais fornecidas', () => {
    cy.intercept('POST', '**/usuarios').as('cadastroSemCredenciais')
    cy.pagina('/cadastrarusuarios')
    cy.get('[data-testid="cadastrar"]').click()

    cy.wait('@cadastroSemCredenciais').its('response.statusCode').should('eq', 400)
    cy.contains('Nome é obrigatório').should('be.visible')
    cy.contains('Email é obrigatório').should('be.visible')
    cy.contains('Password é obrigatório').should('be.visible')
    // Criar sistema para deletar usuário admin criado após teste para evitar acúmulo de dados no banco
  })

  it('Cadastro sem sucesso - usuário já cadastrado', () => {
    cy.intercept('POST', '**/usuarios').as('usuarioExistente')
    cy.pagina('/cadastrarusuarios')
    cy.campos('Victorino Salina', 'victorino.salina@example.com', 'senha123', true)
    cy.get('[data-testid="cadastrar"]').click()

    cy.wait('@usuarioExistente').its('response.statusCode').should('eq', 400)
    cy.contains('Este email já está sendo usado').should('be.visible')
  })

})