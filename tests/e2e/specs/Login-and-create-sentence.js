describe('Login and create a sentence', () => {
  it('Visit Wordsmith base URL', () => {
    cy.visit('/')
    cy.url()
      .should('include', '/login')
    cy.contains('h1', 'Välkomment till Wordsmith!')
  })

  it('Login', () => {
    const username = Cypress.env().test_username
    const password = Cypress.env().test_password
    cy.get('[data-cy="loginEmail"]')
      .type(username)
      .should('have.value', username)

    cy.get('[data-cy="loginPassword"]')
      .type(password)
      .should('have.value', password)

    cy.intercept('POST', '**/login').as('login')

    cy.get('[data-cy="loginSubmit"]')
      .click()

    cy.wait('@login')
      .its('response.statusCode')
      .should('eq', 200)
  })

  // Add this test when we have an delete route
  // it('Add a sentence', () => {
  //   const randomNr = new Date().getTime().toString()
  //   const nrReversed = randomNr.split('').reverse().join('')
  //   const input = `Hej på dig! ${randomNr}`
  //   const inputReversed = `jeH åp gid! ${nrReversed}`

  //   cy.get('[data-cy="smithingInput"]')
  //     .type(input)
  //     .should('have.value', input)

  //   cy.intercept('POST', '**/sentence').as('send')
    
  //   cy.get('[data-cy="smithingButton"]')
  //     .click()

  //   cy.wait('@send')
  //     .its('response.statusCode')
  //     .should('eq', 200)

  //   cy.get('[data-cy="reversedSentence"]')
  //     .eq(0)
  //     .should('have.text', inputReversed)
  // })

  it('Trigger sort', () => {
    cy.get('[data-cy="sortModalBtn"]')
      .click()

    cy.get('[data-cy="modal"]')
      .should('be.visible')

    cy.get('[data-cy="sortTextAscRadio"]')
      .click()
      .should('be.checked')

    cy.get('[data-cy="sortTextDescRadio"]')
      .click()
      .should('be.checked')

    cy.get('[data-cy="sortCreatedAscRadio"]')
      .click()
      .should('be.checked')

    cy.get('[data-cy="sortCreatedDescRadio"]')
      .click()
      .should('be.checked')

    cy.get('[data-cy="closeModalBtn"]')
      .click()

    cy.get('[data-cy="modal"]')
      .should('not.exist')
  })

})
