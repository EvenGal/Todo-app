/// <reference types="cypress" />

//First connect to the application we are testing
describe ('Test todo app', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    //Check that there is two sample todos already made
    it('shows two todo items by default', () => {
        cy.get('.todo').should('have.length', 2)
    })

    it('Can add a new todo item to the list', () => {
        cy.get('.input')
        .click()
        .type('This is also another sample todo')
        cy.get('[type="submit"]')
        .click()
        cy.get('.todo').should('have.length', 3)

    })

    it('Check todo item as completed', () => {
        cy.get(':nth-child(2) > .card-body > .todo > div > .btn-outline-success')
        .click()
        cy.get('.todo').should('have.length', 2)
    })

    it('Delete todo item', () => {
        cy.get(':nth-child(2) > .card-body > .todo > div > .btn-outline-danger')
        .click()
        cy.get('.todo').should('have.length', 1)
    })

    it('Delete completed todo item', () => {
        cy.get(':nth-child(1) > .card-body > .todo > div > .btn-outline-success')
        .click()
        cy.get(':nth-child(1) > .card-body > .todo > div > .btn-outline-danger')
        .click()
        cy.get('.todo').should('have.length', 1)
    })

    it('Reset todo list', () => {
        cy.get('[type="reset"]')
        .click()
        cy.get('.todo').should('have.length', 0)
    })

    it('Add 20 items and reset todo list', () => {
        for(let i = 1; i < 21; i++){
            cy.get('.input')
            .click()
            .type('This is also another sample todo ' + i)
            cy.get('[type="submit"]')
            .click()
        }
        cy.get('.todo').should('have.length', 22)
        cy.get('[type="reset"]')
        .click()
        cy.get('.todo').should('have.length', 0)
    }) 
})