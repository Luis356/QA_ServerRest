describe('Cadastro de usuário', () => {
  it('Cadastro de usuário regular com sucesso', () => {
    
    // AÇÃO
    cy.visit('https://front.serverest.dev/cadastrarusuarios') 
    cy.get('#nome').type('PEDRO SILVA')
    cy.get('#email').type('predo.silva@example.com')
    cy.get('#password').type('senha123')
    cy.get('[data-testid="cadastrar"]').click()

    // ASSERÇÃO
    cy.contains('Cadastro realizado com sucesso').should('be.visible')
    
  })
  
  it.only('Cadastro de usuário admin com sucesso', () => {
    
    cy.intercept('POST', '**/usuarios').as('cadastroAdmin')
    
    //  statusCode: 201,
    //  body: {
    //    message: 'Cadastro realizado com sucesso'
    //  }
    //}).as('cadastroAdmin')
    
    cy.visit('https://front.serverest.dev/cadastrarusuarios') 
    cy.get('#nome').type('Victorino Salina')
    cy.get('#email').type('victorino.salina@example.com')
    cy.get('#password').type('senha123')
    cy.get('#administrador').check()
    cy.get('[data-testid="cadastrar"]').click()
    
    cy.wait('@cadastroAdmin').its('response.statusCode').should('eq',201)
    cy.contains('Cadastro realizado com sucesso').should('be.visible')

  })

  it('Cadastro sem sucesso - sem credenciais fornecidas', () => {
    
  })

  it('Cadastro sem sucesso - usuário já cadastrado', () => {
    
  })

})