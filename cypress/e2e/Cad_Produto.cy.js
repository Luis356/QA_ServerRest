describe('Página de Cadastro de Produtos', () => {
    it('Deve cadastrar produto com sucesso', () => {
        cy.apiCadastro('Admin Teste Produto', 'admin.teste@produto.com', 'senha123', 'true')
        cy.apiLogin('admin.teste@produto.com', 'senha123')
        cy.visit('/admin/cadastrarprodutos')

        cy.get('[data-testid="nome"]').type('Cadastro Produto teste')
        cy.get('[data-testid="preco"]').type('450')
        cy.get('[data-testid="descricao"]').type('Exemplo de produto para teste de cadastro')
        cy.get('[data-testid="quantity"]').type('50')
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.url().should('eq', 'https://front.serverest.dev/admin/listarprodutos')
        cy.contains('Cadastro Produto teste').should('be.visible')
    })

    it('Deve exibir erro ao tentar cadastrar sem fornecer dados', () => {
        cy.apiLogin('admin.teste@produto.com', 'senha123')
        cy.visit('/admin/cadastrarprodutos')
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.contains('Nome é obrigatório').should('be.visible')
        cy.contains('Preco é obrigatório').should('be.visible')
        cy.contains('Descricao é obrigatório').should('be.visible')
        cy.contains('Quantidade é obrigatório').should('be.visible')
    })

    it('Não deve permitir acesso à página sem autenticação', () => {
        cy.visit('/admin/cadastrarprodutos')

        cy.url().should('include', '/login')
    })

    it('Deve dar erro ao cadastrar produto duplicado', () => {
        cy.apiLogin('admin.teste@produto.com', 'senha123')
        cy.visit('/admin/cadastrarprodutos')
        cy.get('[data-testid="nome"]').type('Cadastro Produto teste')
        cy.get('[data-testid="preco"]').type('450')
        cy.get('[data-testid="descricao"]').type('Exemplo de produto para teste de cadastro')
        cy.get('[data-testid="quantity"]').type('50')
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.contains('Já existe produto com esse nome').should('be.visible')
        cy.deleteUsuario('admin.teste@produto.com')
    })

})
