describe('Página de Login', () => {
    it('Deve fazer login com sucesso', () => {
        cy.apiCadastro('Usuario Teste Login', 'teste.login@example.com', 'senha123', 'false')
        cy.visit('/login')
        cy.get('[data-testid="email"]').type('teste.login@example.com')
        cy.get('[data-testid="senha"]').type('senha123')
        cy.get('[data-testid="entrar"]').click()
        
        cy.url().should('include', '/home')
        cy.contains('Serverest Store').should('be.visible')
        
        cy.deleteUsuario('teste.login@example.com')
    }) 
    
    it('Deve exibir erro ao fazer login sem credenciais', () => {
        cy.visit('/login')
        cy.get('[data-testid="entrar"]').click()
        
        cy.contains('Email é obrigatório').should('be.visible')
        cy.contains('Password é obrigatório').should('be.visible')
    }) 
    
    it('Deve exibir erro ao fazer login com senha incorreta', () => {
        cy.apiCadastro('Usuario Teste Senha', 'teste.senha@example.com', 'senha123', 'false')
        cy.visit('/login')
        cy.url().should('include', '/login')
        cy.get('[data-testid="email"]').type('teste.senha@example.com')
        cy.get('[data-testid="senha"]').type('senhaErrada')
        cy.get('[data-testid="entrar"]').click()
        
        cy.contains('Email e/ou senha inválidos').should('be.visible')
        
        cy.deleteUsuario('teste.senha@example.com')
    }) 

    it('Deve exibir erro ao fazer login com email que não existe', () => {
        cy.visit('/login')
        cy.url().should('include', '/login')
        cy.get('[data-testid="email"]').type('emailque@naoexiste.com')
        cy.get('[data-testid="senha"]').type('qualquersenha123')
        cy.get('[data-testid="entrar"]').click()
        
        cy.contains('Email e/ou senha inválidos').should('be.visible')
    }) 

})
