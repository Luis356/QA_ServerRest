describe('Página de Cadastro de usuarios', () => {
    beforeEach(() => {
        cy.apiCadastro('Admin Teste Usuario', 'admin.teste@example.com', 'senha123', 'true')
        cy.visit('/admin/cadastrarusuarios')
    })
    afterEach(() => {
        cy.deleteUsuario('admin.teste@example.com')
    })

    it('Deve cadastrar usuário regular com sucesso', () => {
        cy.intercept('POST', '**/usuarios').as('cadastroUsuario')
        cy.campos('Usuário regular', 'usuario.criado.teste@example.com', 'senha123', false)
        cy.get('[data-testid="cadastrarUsuario"]').click()

        cy.contains('usuario.criado.teste@example.com').should('be.visible')
        cy.validaAdm('Usuário regular', 'usuario.criado.teste@example.com', 'não')
        cy.deleteUsuario('usuario.criado.teste@example.com')
        cy.wait('@cadastroUsuario').its('response.statusCode').should('eq', 201)
    })
  
    it('Deve cadastrar usuário admin com sucesso', () => {
        cy.intercept('POST', '**/usuarios').as('cadastroUsuario')
        cy.campos('Usuário admin', 'usuario.admin.teste@example.com', 'senha123', true)
        cy.get('[data-testid="cadastrarUsuario"]').click()

        cy.contains('usuario.admin.teste@example.com').should('be.visible')
        cy.validaAdm('Usuário admin', 'usuario.admin.teste@example.com', 'sim')
        cy.deleteUsuario('usuario.admin.teste@example.com')
        cy.wait('@cadastroUsuario').its('response.statusCode').should('eq', 201)
    })

    it('Deve exibir erro ao tentar cadastrar sem fornecer dados', () => {
        cy.intercept('POST', '**/usuarios').as('cadastroSemDados')
        cy.get('[data-testid="cadastrarUsuario"]').click()

        cy.contains('Nome é obrigatório').should('be.visible')
        cy.contains('Email é obrigatório').should('be.visible')
        cy.contains('Password é obrigatório').should('be.visible')
        cy.wait('@cadastroSemDados').its('response.statusCode').should('eq', 400)
    })

    it('Deve exibir erro ao tentar cadastrar com email já existente', () => {
        cy.intercept('POST', '**/usuarios').as('cadastroEmailExistente')
        cy.campos('Admin Teste Usuario', 'admin.teste@example.com', 'senha123', false)
        cy.get('[data-testid="cadastrarUsuario"]').click()

        cy.contains('Este email já está sendo usado').should('be.visible')
        cy.wait('@cadastroEmailExistente').its('response.statusCode').should('eq', 400)
    })
})