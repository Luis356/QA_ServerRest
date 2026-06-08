describe('Cadastro de usuário', () => {
  it('Cadastro de usuário regular com sucesso', () => {
    cy.visit('/cadastrarusuarios')
    cy.campos('Victorino Salina', 'victorino.salina@example.com', 'senha123', false)
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Cadastro realizado com sucesso').should('be.visible')
  })
  
  it('Cadastro de usuário administrador com sucesso', () => {
    cy.visit('/cadastrarusuarios')
    cy.campos('Teste_cadastro_admin', 'testecadastroadmin@example.com', 'senha123', true)
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Cadastro realizado com sucesso').should('be.visible')

    cy.deleteUsuario('testecadastroadmin@example.com')
  })

  it('Cadastro sem sucesso - sem credenciais fornecidas', () => {
    cy.intercept('POST', '**/usuarios').as('cadastroSemCredenciais')
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="cadastrar"]').click()
    
    cy.contains('Nome é obrigatório').should('be.visible')
    cy.contains('Email é obrigatório').should('be.visible')
    cy.contains('Password é obrigatório').should('be.visible')
    cy.wait('@cadastroSemCredenciais').its('response.statusCode').should('eq', 400)
  })

  it('Cadastro sem sucesso - usuário já cadastrado', () => {
    cy.intercept('POST', '**/usuarios').as('usuarioExistente')
    cy.visit('/cadastrarusuarios')
    cy.campos('Victorino Salina', 'victorino.salina@example.com', 'senha123', false)
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Este email já está sendo usado').should('be.visible')
    cy.wait('@usuarioExistente').its('response.statusCode').should('eq', 400)
    cy.deleteUsuario('victorino.salina@example.com')
  })
})