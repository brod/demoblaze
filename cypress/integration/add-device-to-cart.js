
describe('Add Samsung Galaxy S6 to cart test', () => {
    const url = `${Cypress.config('baseUrl')}`;
    const userEmail = `${Math.floor(Date.now())}`
    const userPassword = 'password123'
    const testDeviceToAdd = 'Samsung galaxy s6'

    before(() => {
        cy.visit(url)
          .createAccount(userEmail, userPassword)
          .loginUser(userEmail, userPassword)
    });

    it('should add device to cart successfully', () => {
        cy.addDeviceToCart(testDeviceToAdd)
        cy.visit(`${url}/cart.html`).then(() => {
            cy.get('#tbodyid')
              .should('contain', testDeviceToAdd);
        })
    })
})