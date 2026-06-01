/*
    Testes de E2E para a página de cadastro de produtos, incluindo:
    1. Cadastro de produto com sucesso preenchendo todos os campos.
    2. Tentativa de cadastro sem fornecer nenhum dado.
    3. Tentativa de cadastro sem preencher campos obrigatórios.
    4. Cadastro de produto com validação de mensagem de sucesso.
*/

describe('Página de Cadastro de Produtos', () => {


    beforeEach(() => {
        cy.apiCadastro('Admin Teste Produto', 'admin.teste@example.com', 'senha123', 'true')

        cy.visit('/admin/cadastrarprodutos')
    })

    afterEach(() => {
        cy.deleteUsuario('admin.teste@example.com')
    })

    it.only('Deve cadastrar produto com sucesso', () => {
        cy.apiLogin()
        cy.get('[data-testid="nome"]').type('Cadastro Produto teste - Example')
        cy.get('[data-testid="preco"]').type('450')
        cy.get('[data-testid="descricao"]').type('Examplo de produto para teste de cadastro')
        cy.get('[data-testid="quantity"]').type('50')
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.url().should('eq', 'https://front.serverest.dev/admin/listarprodutos')
        cy.deleteProduto('Cadastro Produto teste - Example')
    }) // Teste para cadastro de produto com sucesso - FUNCIONANDO

    it('Deve exibir erro ao tentar cadastrar sem fornecer dados', () => {
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.contains('Nome é obrigatório').should('be.visible')
        cy.contains('Preço é obrigatório').should('be.visible')
        cy.contains('Descrição é obrigatória').should('be.visible')
        cy.contains('Quantidade é obrigatória').should('be.visible')
        cy.contains('Imagem é obrigatória').should('be.visible')
    }) // Teste para cadastro sem dados - FUNCIONANDO

    it('Deve exibir erro ao tentar cadastrar sem preencher campo obrigatório', () => {

        cy.get('[data-testid="nome"]').type('Teclado Mecânico')
        cy.get('[data-testid="preco"]').type('350')
        cy.get('[data-testid="quantity"]').type('25')
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.contains('Descrição é obrigatória').should('be.visible')
    }) // Teste para cadastro com campos faltando - FUNCIONANDO

    it('Deve cadastrar produto e exibir na lista de produtos', () => {
        cy.get('[data-testid="nome"]').type('Monitor Samsung 27')
        cy.get('[data-testid="preco"]').type('890')
        cy.get('[data-testid="descricao"]').type('Monitor 4K com painel IPS e HDR')
        cy.get('[data-testid="quantity"]').type('15')
        cy.get('[data-testid="cadastarProdutos"]').click()

        cy.contains('Produto cadastrado com sucesso').should('be.visible')

        cy.url().should('include', '/admin/produtos')
        cy.contains('Monitor Samsung 27').should('be.visible')
    }) // Teste para cadastro com validação na lista - FUNCIONANDO

})
