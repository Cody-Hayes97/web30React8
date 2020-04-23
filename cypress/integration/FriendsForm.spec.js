import { v4 as uuid } from 'uuid'

const username = uuid().slice(0, 5)
const email = `${username}@acme.com`
const hobby1 = 'hiking'
const civil1 = 'married'
const civil2 = 'single'

describe('submit friend (happy path)', () => {
  it('can navigate to the site', () => {
    cy.visit('')
    cy.url().should('include', 'localhost:1234')
  })

  it('can type a username', () => {
    cy.get('input[name="username"]')
      .type(username)
      .should('have.value', username)
  })

  it('can type an email', () => {
    cy.get('input[name="email"]')
      .type(email)
      .should('have.value', email)
  })

  it('can select a civil status', () => {
    cy.get('select[name="civil"]')
      .select(civil1)
      .should('have.value', civil1)
      .select(civil2)
      .should('have.value', civil2)
  })

  it('can check a checkbox', () => {
    cy.get(`input[name="${hobby1}"]`)
      .check()
      .should('have.checked')

    // cy.contains(/submit/i).then(btn => {
    //   debugger
    // })
  })

  it('can submit a new friend', () => {
    cy.contains(/submit/)
      .click()

    cy.get('.friend.container').as('friend')

    cy.get('@friend')
      .contains(username)
      .next().contains(email)
      .next().contains('Married: No')
      .next().contains(hobby1)
  })
})

describe('validation errors', () => {
  it('shows error message when username < 3 chars', () => {
    cy.get('input[name="username"]')
      .type('a')
      .should('have.value', 'a')

    cy.get('form .errors')
      .contains('username must have at least 3 characters!')

    cy.get('input[name="username"]')
      .type('b')
      .should('have.value', 'ab')

    cy.get('form .errors')
      .contains('username must have at least 3 characters!')

    cy.get('input[name="username"]')
      .type('c')
      .should('have.value', 'abc')

    cy.get('form .errors')
      .contains('username must have at least 3 characters!')
      .should('not.exist')
  })
})
