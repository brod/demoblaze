const baseApiUrl = 'https://api.demoblaze.com'
const baseUrl = `${Cypress.config('baseUrl')}`;

Cypress.Commands.add("createAccount", (email, password) => {
    cy.get('#signin2').click();
    cy.wait(1000);
    cy.get('#sign-username').should('exist').type(email);
    cy.get('#sign-password').should('exist').type(password);
    cy.get('#signInModal').find('.btn.btn-primary').click();
})

Cypress.Commands.add("loginUser", (email, password) => {
    cy.server()
      .route('POST', `${baseApiUrl}/login`).as('login');
    cy.get('#login2').click();
    cy.wait(1000);
    cy.get('#loginusername').type(email);
    cy.get('#loginpassword').type(password);
    cy.get('#logInModal').find('.btn.btn-primary').click().then(() => {
        cy.get('#nameofuser')
          .should('exist')
          .wait('@login');
    })
})

Cypress.Commands.add("addDeviceToCart", (device) => {
    cy.server()
      .route('POST', `${baseApiUrl}/addtocart`).as('addToCart');
    cy.visit(baseUrl)
      .get('#tbodyid')
      .find('a')
      .contains(device)
      .click();
    cy.get('.btn.btn-success.btn-lg')
      .click();
    cy.wait('@addToCart');
})
