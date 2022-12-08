describe('queue page works correctly', () => {
  before(() => {
    cy.visit('/queue')
  })

  beforeEach(() => {
    cy.clock()
    cy.contains('Добавить').as('add_button')
    cy.contains('Удалить').as('delete_button')
    cy.contains('Очистить').as('clear_button')
  })

  it('has an empty input and disabled button', () => {
    cy.get('input').should('have.value', '')
    cy.get('@add_button').should('be.disabled')
    cy.get('@delete_button').should('be.disabled')
    cy.get('@clear_button').should('be.disabled')

    cy.get('input').type('5').should('have.value', '5')
    cy.get('@add_button').should('not.be.disabled')
    cy.get('@delete_button').should('be.disabled')
    cy.get('@clear_button').should('be.disabled')

    cy.get('input').clear()
    cy.get('@add_button').should('be.disabled')
  })

  it('should add node correctly', () => {
    cy.get('div[class*="circle_circle"]')
      .should('have.length', 7)
      .should('have.text', '')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')

    cy.get('input').type('1').should('have.value', '1')
    cy.get('@add_button').click()

    cy.tick(500)

    // У первого круга появляется значение 1, флаги head и tail, цвет границы - фиолетовый
    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_circle"]')).should('have.text', '1').should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', 'head')
      cy.wrap(items.eq(0).find('p[class*="circle_index"]')).should('contain', 0)
      cy.wrap(items.eq(0).find('div[class*="circle_tail"]')).should('have.text', 'tail')
    })

    cy.tick(500)

    // У первого круга меняется цвет границы на синий
    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(0, 50, 255)')
    })

    cy.get('input').type('2').should('have.value', '2')
    cy.get('@add_button').click()

    cy.tick(500)

    // У первого круга пропадает флаг tail, у второго круга появляется значение 2, флаг tail, цвет границы - фиолетовый
    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_circle"]')).should('have.text', '1').should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', 'head')
      cy.wrap(items.eq(0).find('p[class*="circle_index"]')).should('contain', 0)
      cy.wrap(items.eq(0).find('div[class*="circle_tail"]')).should('have.text', '')

      cy.wrap(items.eq(1).find('div[class*="circle_circle"]')).should('have.text', '2').should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(1).find('div[class*="circle_head"]')).should('have.text', '')
      cy.wrap(items.eq(1).find('p[class*="circle_index"]')).should('contain', 1)
      cy.wrap(items.eq(1).find('div[class*="circle_tail"]')).should('have.text', 'tail')
    })

    cy.tick(500)

    // У второго круга меняется цвет границы на синий
    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(1).find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(0, 50, 255)')
    })

    cy.tick(500)

    cy.get('input').type('3').should('have.value', '3')
    cy.get('@add_button').click()

    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_circle"]')).should('have.text', '1').should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', 'head')
      cy.wrap(items.eq(0).find('p[class*="circle_index"]')).should('contain', 0)
      cy.wrap(items.eq(0).find('div[class*="circle_tail"]')).should('have.text', '')

      cy.wrap(items.eq(1).find('div[class*="circle_circle"]')).should('have.text', '2').should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.wrap(items.eq(1).find('div[class*="circle_head"]')).should('have.text', '')
      cy.wrap(items.eq(1).find('p[class*="circle_index"]')).should('contain', 1)
      cy.wrap(items.eq(1).find('div[class*="circle_tail"]')).should('have.text', '')

      cy.wrap(items.eq(2).find('div[class*="circle_circle"]')).should('have.text', '3').should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(2).find('div[class*="circle_head"]')).should('have.text', '')
      cy.wrap(items.eq(2).find('p[class*="circle_index"]')).should('contain', 2)
      cy.wrap(items.eq(2).find('div[class*="circle_tail"]')).should('have.text', 'tail')
    })

    cy.tick(500*2)

    // У третьего круга меняется цвет границы на синий
    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(2).find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(0, 50, 255)')
    })
  })

  it('should delete node correctly', () => {
    cy.get('input').type('4').should('have.value', '4')
    cy.get('@add_button').click()
    
    cy.get('@delete_button').click()

    cy.tick(500)

    // У первого круга пропадает значение и флаг head, цвет границы - фиолетовый
    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_circle"]')).should('have.text', '').should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', '')
      cy.wrap(items.eq(0).find('p[class*="circle_index"]')).should('contain', 0)
      cy.wrap(items.eq(0).find('div[class*="circle_tail"]')).should('have.text', '')
    })

    cy.tick(500)

    // У первого круга меняется цвет границы на синий, у второго круга появляется флаг head
    cy.get('div[class*="circle_content"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.wrap(items.eq(1).find('div[class*="circle_head"]')).should('have.text', 'head')
    })
  })

  it('should clear queue correctly', () => {
    cy.get('input').type('5').should('have.value', '5')
    cy.contains('Добавить').click()

    cy.tick(500)

    cy.get('@clear_button').click()

    cy.tick(500)

    cy.get('div[class*="circle_circle"]')
      .should('have.length', 7)
      .should('have.text', '')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
  })
})