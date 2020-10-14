describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'doggy',
      username: 'doggy',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('doggy')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()

      cy.contains('doggy logged in')
      // log out
      cy.contains('log out').click()
    })

    it('login with wrong credential', function () {
      cy.get('#username').type('doggy')
      cy.get('#password').type('23456')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credential')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'doggy logged in')
    })
  })


  
})