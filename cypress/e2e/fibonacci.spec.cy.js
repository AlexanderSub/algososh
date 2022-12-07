describe('fibonacci page works correctly', () => {
  before(() => {
    cy.visit('/fibonacci')
  })

  it('has an empty input and disabled button', () => {
    cy.get('input').should('have.value', '')
    cy.get('button').should('be.disabled')

    cy.get('input').type('5').should('have.value', '5')
    cy.get('button').should('not.be.disabled')
  })

  it('should generate fibonacci numbers correctly', () => {

    cy.contains('Рассчитать').click()

    cy.get('div[class*="circle_circle"]').as('circles')

    cy.get('@circles').should('have.length', 1).contains(0)

    cy.get('@circles').should('have.length', 2).each(($div, index) => {
      if (index === 0) cy.wrap($div).contains(0)
      if (index === 1) cy.wrap($div).contains(1)
    })

    cy.get('@circles').should('have.length', 3).each(($div, index) => {
      if (index === 0) cy.wrap($div).contains(0)
      if (index === 1) cy.wrap($div).contains(1)
      if (index === 2) cy.wrap($div).contains(1)
    })

    cy.get('@circles').should('have.length', 4).each(($div, index) => {
      if (index === 0) cy.wrap($div).contains(0)
      if (index === 1) cy.wrap($div).contains(1)
      if (index === 2) cy.wrap($div).contains(1)
      if (index === 3) cy.wrap($div).contains(2)
    })

    cy.get('@circles').should('have.length', 5).each(($div, index) => {
      if (index === 0) cy.wrap($div).contains(0)
      if (index === 1) cy.wrap($div).contains(1)
      if (index === 2) cy.wrap($div).contains(1)
      if (index === 3) cy.wrap($div).contains(2)
      if (index === 4) cy.wrap($div).contains(3)
    })

    cy.get('@circles').should('have.length', 6).each(($div, index) => {
      if (index === 0) cy.wrap($div).contains(0)
      if (index === 1) cy.wrap($div).contains(1)
      if (index === 2) cy.wrap($div).contains(1)
      if (index === 3) cy.wrap($div).contains(2)
      if (index === 4) cy.wrap($div).contains(3)
      if (index === 5) cy.wrap($div).contains(5)
    })
  })
})