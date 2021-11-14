import { dataCy } from '../support/utils'

describe('Todo', () => {
  const todoText = 'Remember the milk'

  function todoInput () {
    return cy.get(dataCy('new-todo-input'))
  }

  function addTodo (text = 'Remember the milk') {
    todoInput()
      .type(text)
      .closest('form')
      .submit()
  }

  beforeEach(function () {
    cy.visit('/')
  })

  it('focuses the new todo field by default', function () {
    todoInput().should('have.focus')
  })

  it('adds a new todo under incomplete', function () {
    addTodo()

    todoInput().should('be.empty')
    cy.get(dataCy('incomplete-todo')).should('contain.text', todoText)
  })

  it('removes a todo', function () {
    addTodo()

    cy.get(dataCy('incomplete-todo'))
      .as('todo')
      .get(dataCy('remove-todo-link'))
      .click()

    cy.get('@todo').should('not.exist')
  })

  it('completes a todo', function () {
    addTodo()

    cy.get(dataCy('incomplete-todo'))
      .as('todo')
      .get(dataCy('complete-todo-link'))
      .click()

    cy.get('@todo').should('not.exist')
    cy.get(dataCy('complete-todo')).should('contain.text', todoText)
  })

  it('Lists the most recently added first', function () {
    addTodo('One')
    addTodo('Two')
    addTodo('Three')

    const selector = dataCy('incomplete-todo')

    cy.get(selector)
      .first()
      .should('contain.text', 'Three')
      .next(selector)
      .should('contain.text', 'Two')
      .next(selector)
      .should('contain.text', 'One')
  })
})
