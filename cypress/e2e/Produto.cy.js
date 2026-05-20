describe('Página de produtos', () => {

    it.only('Abrir página de produtos', () => {
        cy.fazLogin('admin')
        cy.pagina('/admin/home')
    })

    it('Deve exibir detalhes do produto ao clicar', () => {
        cy.intercept('GET', '**/produtos').as('getProdutos')
        cy.pagina('/produtos')
        cy.wait('@getProdutos').its('response.statusCode').should('eq', 200)
        cy.get('[data-testid="produto"]').first().click()
        cy.url().should('include', '/produtos/')
        cy.get('[data-testid="produto-detalhes"]').should('be.visible')
    })

})