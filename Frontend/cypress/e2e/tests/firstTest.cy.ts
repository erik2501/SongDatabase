/// <reference types="cypress" />

describe('example to-do app', () => {



    it('clicks searchbar and searches for Britney', () => {
       cy.visit('http://localhost:3000')
       cy.get('[data-testid=searchbar]').click()
       cy.get('[data-testid=searchbar]').type('Britney')
    })

    after('clears searchbar', () => {
        cy.get('[data-testid=searchbar]').clear()
    })

    
})