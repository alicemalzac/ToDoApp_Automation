// <reference types="Cypress" />

describe('Creating a Task', () => {
    beforeEach(() => {
        cy.visit('https://qa-test.avenuecode.io/tasks')
        cy.get('#user_email').type('alicelinsc.malzac@gmail.com').should('have.value', 'alicelinsc.malzac@gmail.com')
        cy.get('#user_password').type('assessmentqa').should('have.value','assessmentqa')
        cy.get('.btn').click()
        cy.get('.alert').should('be.visible')
    })
    it('Verify that I see the home screen when I log in', () => {
        cy.get('.navbar-right > :nth-child(1) > a').should('be.visible') //Verifys the "Welcome, Alice Malzac" message
        cy.get('#my_task').should('be.visible')  
    })
    it('Verify that when I click ‘My Tasks’ Im redirect to a page with all the created tasks', () =>  {
        cy.get('.navbar-brand').click() //Goes ToDo App home page 
        cy.get('#my_task').click() //Clicks on My Tasks
        cy.get('h1').should('be.visible')  // Verifys the "Alice Malzac's ToDo List" message
    })
    it('Verify that I can create a new Task', () =>  {
        cy.get('#new_task').type('New Task Test').should('have.value', 'New Task Test')
        cy.get('.input-group-addon').click() 
        cy.contains('New Task Test').should('be.visible')
    })
    it('Verify that I cant create a Task with more than 250 characters', () => {
        const LongDescription = "Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test" 
        cy.get('#new_task').type(LongDescription, {delay: 0})
        cy.get('.input-group-addon').click()
        cy.get('.error').should('be.visible') // Expects a error message
    })
    it('Verify that I cant create a Task with less than 3 characters', () => {
        const ShortDescription = "QA" 
        cy.get('#new_task').type(ShortDescription)
        cy.get('.input-group-addon').click()
        cy.get('.error').should('be.visible') // Expects a error message
    })
    it('Verify that I cant create a Task with an empty description', () => {
        cy.get('.input-group-addon').click()
        cy.get('.error').should('be.visible')
    })
    it('Verify that I cant create a Task with an empty description after a Task has been created', () => {
        cy.get('#new_task').type('Task 1')
        cy.get('.input-group-addon').click()
        cy.get('.input-group-addon').click()
        cy.get('.error').should('be.visible')
    })
    it('Verify that I can remove a Task', () => {
        cy.get('#new_task').type('New Task Test Remove').should('have.value', 'New Task Test Remove')
        cy.get('.input-group-addon').click()
        cy.get(':nth-child(1) > :nth-child(5) > .btn').click()
        cy.contains('New Task Test Remove').should('not.exist') //Expects the task to not be there anymore
    })
    it('Verify that I cant leave a description empty after editing', () =>{
        // Create a new Task
        cy.get('#new_task').type('New Task Test Edit').should('have.value', 'New Task Test Edit')
        cy.get('.input-group-addon').click()
        //Edit the description of the new Task
        cy.get(':nth-child(1) > .task_body > .ng-scope').click()
        cy.get('.editable-has-buttons').clear().should('have.value', '') 
        cy.get('.editable-buttons > .btn-primary').click()
        cy.get('.editable-error').should('be.visible')
        //Verify that the description is still the same
        cy.get('.btn-default').click()
        cy.get(':nth-child(1) > .task_body > .ng-scope').contains('New Task Test Edit')

    })
})