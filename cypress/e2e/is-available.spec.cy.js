describe('service is available', function() {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });
  it('should open home page', () => {
    cy.contains('МБОУ АЛГОСОШ')
  })
}); 