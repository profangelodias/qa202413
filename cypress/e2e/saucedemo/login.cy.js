/// <reference types="cypress" />

context('Login do Saucedemo', () => {
    beforeEach(() => {
        cy.visit("https://www.saucedemo.com/v1/")
    });
    
    it('Login válido', () => {
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('#login-button').click()
        cy.get('.product_label').should('have.text',"Products")
    });

    it('Falhas no login', () => {
        cy.fixture('logins_falhos.json').then((dados) =>{
            // const primeiroUser = dados.dadosLogin[3]

            dados.dadosLogin.forEach((dadoLogin) => {
                cy.get('[data-test="username"]').clear()
                cy.get('[data-test="password"]').clear()

                if(dadoLogin.usuario != ''){
                    cy.get('[data-test="username"]').type(dadoLogin.usuario)
                }
                if(dadoLogin.senha != ''){
                    cy.get('[data-test="password"]').type(dadoLogin.senha)
                }
                cy.get('#login-button').click()
                cy.get('[data-test="error"]').should('have.text',dadoLogin.mensagem)
            })
        })
    });

});