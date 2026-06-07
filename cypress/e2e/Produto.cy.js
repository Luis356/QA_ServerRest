describe('Página de produtos', () => {
    it('Deve abrir página de produtos com sucesso e exibir ao menos um produto', () => {
        cy.apiCadastro('example_produto', 'produto_teste@example.com', 'senha123', 'false')
        cy.visit('/home')

        cy.url().should('include', '/home')
        cy.contains('Serverest Store').should('be.visible')
        cy.get('.card-body', { timeout: 10000 }).should('have.length.greaterThan', 0)
    })

    it('Deve pesquisar os produtos mockados corretamente', () => {
        const itens = require('../fixtures/mock_produtos')
        cy.apiLogin('produto_teste@example.com', 'senha123')
        cy.visit('/home')
        cy.get('.card-body', { timeout: 10000 }).should('exist')
        cy.get('[data-testid="pesquisar"]').type('Apple')
        cy.intercept(
            'GET',
            'https://serverest.dev/produtos?nome=Apple',
            { fixture: 'mock_produtos' }
        ).as('getProdutos')
        cy.get('[data-testid="botaoPesquisar"]').click()

        cy.get('.card-body').should('have.length', 4);
    })

    it('Deve adicionar produto específico à lista com sucesso', () => {
        cy.apiLogin('produto_teste@example.com', 'senha123')
        cy.visit('/home')
        cy.get('.card-body', { timeout: 10000 }).should('have.length.greaterThan', 0)
        cy.get('.card-body').first().invoke('text').as('textoOriginal')
        cy.get('[data-testid="adicionarNaLista"]').first().click()

        cy.url().should('include', '/minhaListaDeProdutos')
        cy.get('@textoOriginal').then((textoOriginal) => {
            cy.contains(textoOriginal).should('be.visible')
        })
    })
    
    it('Deve validar os detalhes do produto na página de detalhes', () => {
        cy.visit('/home')
        cy.get('.card-body', { timeout: 10000 }).should('have.length.greaterThan', 0)
        cy.get('[data-testid="product-detail-link"]').first().click()
        cy.get('[data-testid="product-detail-name"]', { timeout: 10000 }).should('be.visible')
        
        cy.contains('R$:').should('be.visible')
        cy.contains('Quantidade:').should('be.visible')
        
        cy.deleteUsuario('produto_teste@example.com')
    })

})