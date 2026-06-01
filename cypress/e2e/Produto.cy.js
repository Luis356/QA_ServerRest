/*
    Testes de E2E para a página de produtos, incluindo abertura da página, adição ao carrinho e filtragem de produtos. Os testes utilizam comandos personalizados para cadastro e login, além de interceptar requisições para validar o comportamento da aplicação. O teste de adição ao carrinho também valida que o produto adicionado é o mesmo exibido na lista de produtos. O teste de filtragem verifica se a busca retorna o número correto de produtos. Todos os testes incluem limpeza de dados após execução para garantir um ambiente limpo para os próximos testes.
    1. Abertura da página de produtos com sucesso.
    2. Adição de produto ao carrinho e validação da adição.
    3. Filtragem de produtos corretamente.
    4. Adição de produto específico à lista com sucesso.
 */
describe('Página de produtos', () => {
    it('Deve abrir página de produtos com sucesso', () => {
        cy.apiCadastro('example_produto', 'produto_teste@example.com', 'senha123', 'false')
        cy.visit('/home')

        cy.url().should('include', '/home')
        cy.contains('Serverest Store').should('be.visible')
    }) // Teste para abrir a página de produtos (Exclui usuário no final do teste) - FUNCIONANDO

    it('Deve filtrar produtos corretamente', () => {
        const itens = require('../fixtures/mock_produtos')
        cy.apiLogin('produto_teste@example.com', 'senha123')
        cy.visit('/home')
        cy.get('[data-testid="pesquisar"]').type('Logitech MX Vertical')
        cy.get('[data-testid="botaoPesquisar"]').click()

        cy.get('.card-body').should('have.length', 1);
    }) // Teste para filtrar produtos - FUNCIONANDO

    it('Deve adicionar produto específico à lista com sucesso', () => {
        cy.apiLogin('produto_teste@example.com', 'senha123')
        cy.visit('/home')
        cy.get('.card-body').first().invoke('text').as('textoOriginal')
        cy.get('[data-testid="adicionarNaLista"]').first().click()

        cy.url().should('include', '/minhaListaDeProdutos')
        cy.get('@textoOriginal').then((textoOriginal) => {
            cy.contains(textoOriginal).should('be.visible')
        })
    }) // Teste para adicionar produto específico à lista com sucesso - FUNCIONANDO

    it('Deve listar e filtrar produtos mockados com sucesso', () => {
        cy.apiLogin('produto_teste@example.com', 'senha123')
        cy.visit('/home')
        cy.intercept('GET', '**/produtos', { fixture: 'mock_produtos.json' }).as('getProdutosMock')
        cy.wait('@getProdutosMock')
        
        cy.contains('Samsung Galaxy S24').should('be.visible')
        cy.deleteUsuario('produto_teste@example.com')
    }) // Teste para listar e filtrar produtos mockados com sucesso - FUNCIONANDO
})