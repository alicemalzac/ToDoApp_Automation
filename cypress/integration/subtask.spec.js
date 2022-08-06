// <reference types="Cypress" />

describe('Creating a SubTask', () => {
  beforeEach(() => {
    cy.visit('https://qa-test.avenuecode.io/tasks')
    cy.get('#user_email').type('alicelinsc.malzac@gmail.com').should('have.value', 'alicelinsc.malzac@gmail.com')
    cy.get('#user_password').type('assessmentqa').should('have.value','assessmentqa')
    cy.get('.btn').click()
    cy.get('.alert').should('be.visible')
  })
  it('Verify that I can create a Subtask', () =>  {
    //Creates a Task
    cy.get('#new_task').type('New Task').should('have.value', 'New Task')
    cy.get('.input-group-addon').click() 
    cy.contains('New Task').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    //Creates a SubTask
    cy.get('#new_sub_task').type('New SubTask').should('have.value', 'New SubTask')
    cy.get('#add-subtask').click()
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body > .ng-scope').contains('New SubTask') //Verify that the subtask is created correctly
  })
  it('Verify that I can only create a SubTask if a Task is created before', () => {
    cy.get('#new_task').type('New Task Test').should('have.value', 'New Task Test')
    cy.get('.input-group-addon').click() 
    cy.contains('New Task Test').should('be.visible')
    cy.get(':nth-child(1) > :nth-child(4) > .btn').should('be.visible')

  })
  it('Verify that I can remove a SubTask', () =>  {
    //Creates a Task
    cy.get('#new_task').type('New Task Remove').should('have.value', 'New Task Remove')
    cy.get('.input-group-addon').click() 
    cy.contains('New Task Remov').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    //Creates a SubTask
    cy.get('#new_sub_task').type('New SubTask').should('have.value', 'New SubTask')
    cy.get('#add-subtask').click()
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body > .ng-scope').contains('New SubTask')
    //Removes SubTask
    cy.get('tr.ng-scope > :nth-child(3) > .btn').click()
    cy.contains('New SubTask').should('not.exist')
  })
  it('Verify that when I check inside the checkbox the Subtask name becomes strikethrough until I check again', () =>   {
    //Creates a Task
    cy.get('#new_task').type('New Task Check').should('have.value', 'New Task Check')
    cy.get('.input-group-addon').click() 
    cy.contains('New Task Check').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    //Creates a SubTask
    cy.get('#new_sub_task').type('New SubTask').should('have.value', 'New SubTask')
    cy.get('#add-subtask').click()
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body > .ng-scope').contains('New SubTask') //Verify that the subtask is created correctly
    //Checks the checkbox
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .col-md-1 > .ng-pristine').click() 
    cy.get('.success > .task_body > .ng-scope').should('be.visible') //Expects the Subtask description to be strikethrough
    cy.get('.success > .task_body').should('be.visible') //Expects the Subtask line to be green 
    //Uncheck the checkbox 
    cy.get('.col-md-1 > .ng-dirty').click() //Expects the checkbox to be unmarked
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body').should('be.visible') //Expects the Subtask line to be white 
    //Goes back to the Task page to verify if the Subtask is the same
    cy.get('.col-md-1 > .ng-dirty').click() //checks the checkbox again
    cy.get('.modal-footer > .btn').click()
    cy.get('h1').should('be.visible')
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.success > .task_body > .ng-scope').should('be.visible') //Expects the Subtask description to be strikethrough
    cy.get('.success > .task_body').should('be.visible') //Expects the Subtask line to be green 
  })
  it.only('Verify that I can rename the Subtask description', () =>   {
    //Creates a Task
    cy.get('#new_task').type('New Task Renamed').should('have.value', 'New Task Renamed')
    cy.get('.input-group-addon').click() 
    cy.contains('New Task Renamed').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    //Creates a SubTask
    cy.get('#new_sub_task').type('New SubTask').should('have.value', 'New SubTask')
    cy.get('#add-subtask').click()
    //Edit the description of the new SubTask
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body > .ng-scope').contains('New SubTask') //Verify that the subtask is created correctly
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body > .ng-scope').click()
    cy.get('.editable-has-buttons').clear().type('New SubTask Renamed') 
    cy.get('.editable-buttons > .btn-primary').click()
    //Verify that the description is changed
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body > .ng-scope').should('have.value', 'New SubTask Renamed')
  
  })
  it('Verify that I cant create an empty SubTask', () =>  {
    //Creates a Task
    cy.get('#new_task').type('New Task Empty').should('have.value', 'New Task Empty')
    cy.get('.input-group-addon').click() 
    cy.contains('New Task Empty').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    //Creates a SubTask
    cy.get('#new_sub_task').should('have.value', '')
    cy.get('#dueDate').clear()
    cy.get('#add-subtask').click()
    cy.get('.error').should('be.visible') //Verify that error message appears
  })
  it('Verify that I cant change the Task description inside the SubTask', () =>  {
    //Creates a Task
    cy.get('#new_task').type('New Task Description').should('have.value', 'New Task Description')
    cy.get('.input-group-addon').click() 
    cy.contains('New Task Description').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    cy.get('#edit_task').type(' Something')
    cy.get('#edit_task').contains('New Task Description') //Verify that the task description is still the same 
  })
  it('Verify that I cant leave a Subtask description empty after editing', () =>{
    // Enter a Task
    cy.get('#new_task').type('New Task Edit').should('have.value', 'New Task Edit')
    cy.get('.input-group-addon').click()
    cy.contains('New Task Edit').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    //Creates a SubTask
    cy.get('#new_sub_task').type('New SubTask Edit').should('have.value', 'New SubTask Edit')
    cy.get('#add-subtask').click()
    //Edit the description of the new SubTask
    cy.get('[ng-show="task.sub_tasks.length"] > .table > tbody > tr.ng-scope > .task_body > .ng-scope').click()
    cy.get('.editable-has-buttons').clear().should('have.value', '') 
    cy.get('.editable-buttons > .btn-primary').click()
    cy.get('.editable-error').should('be.visible')
    //Verify that the description is still the same
    cy.get('.btn-default').click()
    cy.get(':nth-child(1) > .task_body > .ng-scope').contains('New Task Edit')
  })
  it('Verify that the Due Date field allows only numbers', () =>  {
    // Enter a Task
    cy.get('#new_task').type('New Task Date').should('have.value', 'New Task Date')
    cy.get('.input-group-addon').click()
    cy.contains('New Task Date').should('be.visible')
    //Enter Task Edit page
    cy.get(':nth-child(1) > :nth-child(4) > .btn').click()
    cy.get('.modal-body > .panel > .panel-heading').should('be.visible')
    //Creates a SubTask
    cy.get('#new_sub_task').type('New SubTask Date').should('have.value', 'New SubTask Date')
    cy.get('#dueDate').clear().type('Alice')
    cy.get('#add-subtask').click()
    cy.get('.error').should('be.visible') //Verify that error message appears
  })
})


