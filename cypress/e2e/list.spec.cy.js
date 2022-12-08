describe('list page works correctly', () => {
  before(() => {
    cy.visit('/list')
  })

  beforeEach(() => {
    cy.clock()
    cy.contains('Добавить в head').as('add_to_head_button')
    cy.contains('Добавить в tail').as('add_to_tail_button')
    cy.contains('Добавить по индексу').as('add_by_index_button')
    cy.contains('Удалить из head').as('delete_from_head_button')
    cy.contains('Удалить из tail').as('delete_from_tail_button')
    cy.contains('Удалить по индексу').as('delete_by_index_button')
    cy.get('input[placeholder="Введите значение"]').as('input_value')
    cy.get('input[placeholder="Введите индекс"]').as('input_index')
  })

  it('has an empty input and disabled buttons', () => {
    cy.get('@input_value').should('have.value', '')
    cy.get('@add_to_head_button').should('be.disabled')
    cy.get('@add_to_tail_button').should('be.disabled')
    cy.get('@add_by_index_button').should('be.disabled')

    cy.get('@input_value').type('5').should('have.value', '5')
    cy.get('@add_to_head_button').should('not.be.disabled')
    cy.get('@add_to_tail_button').should('not.be.disabled')
    cy.get('@add_by_index_button').should('not.be.disabled')

    cy.get('@input_value').clear()
    cy.get('@add_to_head_button').should('be.disabled')
    cy.get('@add_to_tail_button').should('be.disabled')
    cy.get('@add_by_index_button').should('be.disabled')
  })

  it('has correct default list', () => {
    cy.get('div[class*="circle_default"]')
      .should('have.length', 4)
      .should('not.be.empty')
      .should('have.css', 'border-color', 'rgb(0, 50, 255)')
  })

  it('should add node to head correctly', () => {
    cy.get('@input_value').type('123').should('have.value', '123')
    cy.get('@add_to_head_button').click()

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="topCircle"]').find('div[class*="circle_circle"]')).should('have.text', '123').should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', '')
      cy.wrap(items.eq(0).find('p[class*="circle_index"]')).should('contain', 0)
      cy.wrap(items.eq(0).find('div[class*="circle_tail"]')).should('have.text', '')
    })

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="topCircle"]')).should('have.text', '')
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', 'head')
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '123').should('have.css', 'border-color', 'rgb(127, 224, 81)')
    })

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '123').should('have.css', 'border-color', 'rgb(0, 50, 255)')
    })
  })

  it('should add node to tail correctly', () => {
    cy.get('@input_value').type('456').should('have.value', '456')
    cy.get('@add_to_tail_button').click()

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(items.length - 1).find('div[class*="topCircle"]').find('div[class*="circle_circle"]')).should('have.text', '456').should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(items.length - 1).find('div[class*="circle_head"]')).should('have.text', '')
      cy.wrap(items.eq(items.length - 1).find('p[class*="circle_index"]')).should('contain', items.length - 1)
      cy.wrap(items.eq(items.length - 1).find('div[class*="circle_tail"]')).should('have.text', 'tail')
    })

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(items.length - 1).find('div[class*="topCircle"]')).should('have.text', '')
      cy.wrap(items.eq(items.length - 1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '456').should('have.css', 'border-color', 'rgb(127, 224, 81)')
    })

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(items.length - 1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '456').should('have.css', 'border-color', 'rgb(0, 50, 255)')
    })
  })

  it('should add node by index correctly', () => {
    cy.get('@input_value').type('789').should('have.value', '789')
    cy.get('@input_index').type(2).should('have.value', '2')
    cy.get('@add_by_index_button').click()

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="topCircle"]').find('div[class*="circle_circle"]')).should('have.text', '789').should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', '')
      cy.wrap(items.eq(0).find('p[class*="circle_index"]')).should('contain', 0)
    })

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', 'head')
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wrap(items.eq(1).find('div[class*="topCircle"]').find('div[class*="circle_circle"]')).should('have.text', '789').should('have.css', 'border-color', 'rgb(210, 82, 225)')
    })

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wrap(items.eq(1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wrap(items.eq(2).find('div[class*="topCircle"]').find('div[class*="circle_circle"]')).should('have.text', '789').should('have.css', 'border-color', 'rgb(210, 82, 225)')
    })

    cy.tick(500*4)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.wrap(items.eq(1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.wrap(items.eq(2).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '789').should('have.css', 'border-color', 'rgb(127, 224, 81)')
    })

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(2).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(0, 50, 255)')
    })
  })

  it('should delete node from head correctly', () => {
    cy.get('@delete_from_head_button').click()

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="circle_head"]')).should('have.text', 'head')
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '').should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.wrap(items.eq(0).find('div[class*="bottomCircle"]').find('div[class*="circle_circle"]')).should('have.text', '123').should('have.css', 'border-color', 'rgb(210, 82, 225)')
    })

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('not.be.empty')
      cy.wrap(items.eq(0).find('div[class*="bottomCircle"]').find('div[class*="circle_circle"]')).should('have.text', '').should('have.css', 'visibility', 'hidden')
    })
  })

  it('should delete node from tail correctly', () => {
    cy.get('@delete_from_tail_button').click()

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(items.length - 1).find('div[class*="circle_tail"]')).should('have.text', '')
      cy.wrap(items.eq(items.length - 1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '').should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.wrap(items.eq(items.length - 1).find('div[class*="bottomCircle"]').find('div[class*="circle_circle"]')).should('have.text', '456').should('have.css', 'border-color', 'rgb(210, 82, 225)')
    })

    cy.tick(500)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(items.length - 1).find('div[class*="circle_tail"]')).should('have.text', 'tail')
      cy.wrap(items.eq(items.length - 1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('not.be.empty')
      cy.wrap(items.eq(items.length - 1).find('div[class*="bottomCircle"]').find('div[class*="circle_circle"]')).should('have.text', '').should('have.css', 'visibility', 'hidden')
    })
  })

  it('should delete node by index correctly', () => {
    cy.get('@input_index').clear().type(1).should('have.value', '1')
    cy.get('@delete_by_index_button').click()

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(210, 82, 225)')
    })

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(0).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(210, 82, 225)')
      cy.wrap(items.eq(1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.css', 'border-color', 'rgb(210, 82, 225)')
    })

    cy.tick(500*4)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('have.text', '').should('have.css', 'border-color', 'rgb(0, 50, 255)')
      cy.wrap(items.eq(1).find('div[class*="bottomCircle"]').find('div[class*="circle_circle"]')).should('have.text', '789').should('have.css', 'border-color', 'rgb(210, 82, 225)')
    })

    cy.tick(500*2)

    cy.get('div[class*="circlesWrapper"]').then(items => {
      cy.wrap(items.eq(1).find('div[class*="centralCircle"]').find('div[class*="circle_circle"]')).should('not.be.empty')
      cy.wrap(items.eq(1).find('div[class*="bottomCircle"]').find('div[class*="circle_circle"]')).should('have.text', '').should('have.css', 'visibility', 'hidden')
    })
  })
})