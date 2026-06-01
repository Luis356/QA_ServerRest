/* >FUNCIONANDO<
Teste de cadastro de usuário utilizando Cypress. O teste cobre os seguintes cenários:
1. Cadastro de usuário regular com sucesso.
2. Cadastro de usuário administrador com sucesso.
3. Tentativa de cadastro sem fornecer credenciais, verificando as mensagens de erro.
4. Tentativa de cadastro com um email já existente, verificando a mensagem de erro correspondente.
*/
describe('Cadastro de usuário', () => {
  it('Cadastro de usuário regular com sucesso', () => {
    cy.visit('/cadastrarusuarios')
    cy.campos('Teste_cadastro_regular', 'testecadastroregular@example.com', 'senha123', false)
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Cadastro realizado com sucesso').should('be.visible')

    cy.deleteUsuario('testecadastroregular@example.com')
  }) // Teste para cadastro de usuário regular (Exclui usuário no final do teste) - FUNCIONANDO

  it('Cadastro de usuário administrador com sucesso', () => {
    cy.visit('/cadastrarusuarios')
    cy.campos('Teste_cadastro_admin', 'testecadastroadmin@example.com', 'senha123', true)
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Cadastro realizado com sucesso').should('be.visible')

    cy.deleteUsuario('testecadastroadmin@example.com')
  }) // Teste para cadastro de usuário administrador (Exclui usuário no final do teste) - FUNCIONANDO 
  
  it('Cadastro sem sucesso - sem credenciais fornecidas', () => {
    cy.intercept('POST', '**/usuarios').as('cadastroSemCredenciais')
    cy.visit('/cadastrarusuarios')
    cy.get('[data-testid="cadastrar"]').click()

    cy.contains('Nome é obrigatório').should('be.visible')
    cy.contains('Email é obrigatório').should('be.visible')
    cy.contains('Password é obrigatório').should('be.visible')
    cy.wait('@cadastroSemCredenciais').its('response.statusCode').should('eq', 400)
  }) // Teste para cadastro sem fornecer credenciais - FUNCIONANDO

  it('Cadastro sem sucesso - usuário já cadastrado', () => {
    cy.intercept('POST', '**/usuarios').as('usuarioExistente')
    cy.visit('/cadastrarusuarios')
    cy.campos('Victorino Salina', 'victorino.salina@example.com', 'senha123', true)
    cy.get('[data-testid="cadastrar"]').click()
    
    cy.contains('Este email já está sendo usado').should('be.visible')
    cy.wait('@usuarioExistente').its('response.statusCode').should('eq', 400)
  }) // Teste para cadastro com email já existente - FUNCIONANDO

})