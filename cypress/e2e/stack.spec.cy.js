/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe('stack page works correctly', () => {
  before(() => {
    cy.visit('/stack')
  })

  it('has an empty input and disabled button', () => {
    cy.get('input').should('have.value', '')
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')

    cy.get('input').type('5').should('have.value', '5')
    cy.contains('Добавить').should('not.be.disabled')
  })

  it('should add node correctly', () => {
    cy.contains('Добавить').click()
    cy.contains('Удалить').should('not.be.disabled')
    cy.contains('Очистить').should('not.be.disabled')

    cy.get('div[class*="circle_circle"]').as('circles')

    cy.get('@circles')
      .should('have.length', 1)
      .should('contain', '5')
      .should('have.css', 'border', '4px solid rgb(210, 82, 225)')

    cy.wait(500)
    cy.get('@circles')
      .should('have.length', 1)
      .should('contain', '5')
      .should('have.css', 'border', '4px solid rgb(0, 50, 255)')

    cy.wait(500)
  })

  it('should delete node correctly', () => {
    cy.contains('Удалить').click()
    cy.get('div[class*="circle_circle"]').should('not.be.exist')
    cy.wait(500)
  })

  it('should clear nodes correctly', () => {
    cy.get('input').type('1').should('have.value', '1')
    cy.contains('Добавить').click()
    cy.wait(500)
    cy.get('input').type('2').should('have.value', '2')
    cy.contains('Добавить').click()
    cy.wait(500)
    cy.get('input').type('3').should('have.value', '3')
    cy.contains('Добавить').click()
    cy.wait(500)
    cy.get('div[class*="circle_circle"]').should('be.exist')
    cy.contains('Очистить').click()
    cy.get('div[class*="circle_circle"]').should('not.be.exist')
  })
})