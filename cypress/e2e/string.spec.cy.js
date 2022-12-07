describe('string page works correctly', () => {
  before(() => {
    cy.visit('/recursion')
  })

  it('has an empty input and disabled button', () => {
    cy.get('input').should('have.value', '')
    cy.get('button').should('be.disabled')

    cy.get('input').type('yandex').should('have.value', 'yandex')
    cy.get('button').should('not.be.disabled')
  })

  it('should reverse string correctly', () => {
    cy.contains('Развернуть').click()

    cy.get('div[class*="circle_circle"]').as('circles')

    cy.get('@circles').each(($div, index) => {
      if (index === 0) cy.wrap($div).contains('y')
      if (index === 1) cy.wrap($div).contains('a')
      if (index === 2) cy.wrap($div).contains('n')
      if (index === 3) cy.wrap($div).contains('d')
      if (index === 4) cy.wrap($div).contains('e')
      if (index === 5) cy.wrap($div).contains('x')
    })

    cy.get('@circles').each(($div, index) => {
      if (index === 0 || index === 5) {
        cy.wrap($div).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
      }
    })

    cy.get('@circles').each(($div, index) => {
      if (index === 0) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('x');
      if (index === 5) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('y');

      if (index === 1) cy.wrap($div).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('a');
      if (index === 4) cy.wrap($div).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('e');
    });

    cy.get('@circles').each(($div, index) => {
      if (index === 1) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('e');
      if (index === 4) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('a');

      if (index === 2) cy.wrap($div).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('n');
      if (index === 3) cy.wrap($div).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('d');
    });

    cy.get('@circles').each(($div, index) => {
      if (index === 2) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('d')
      if (index === 3) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('n')
    });

    cy.get('@circles').each(($div, index) => {
      if (index === 0) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('x')
      if (index === 1) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('e')
      if (index === 2) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('d')
      if (index === 3) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('n')
      if (index === 4) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('a')
      if (index === 5) cy.wrap($div).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('y')
    });
  })
})