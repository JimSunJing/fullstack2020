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

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'doggy logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'doggy',
        password: '12345'
      })
    })

    it('A blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('hello cypress')
      cy.get('#author').type('jim')
      cy.get('#url').type('google.com')
      cy.get('#create-blog-button').click()

      cy.get('html').contains('hello cypress jim')
    })

    it('test on like btn', function () {
      cy.createBlog({
        title: 'i need a like',
        author: 'trump',
        url: 'google.com'
      })

      cy.contains('i need a like trump').as('thePost')

      cy.get('@thePost').contains('view').click()
      cy.get('@thePost').parent().get('#likeBtn').click()
      cy.get('@thePost').parent().contains('likes 1')
    })

    //exerceise 5.22
    describe('blog order', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'aaa', author: 'A',
          url: 'google.com', likes: 11
        })
        cy.createBlog({
          title: 'bbb', author: 'B',
          url: 'google.com', likes: 22
        })
        cy.createBlog({
          title: 'ccc', author: 'C',
          url: 'google.com', likes: 33
        })
      })

      it('blogs are ordered by likes', function () {
        cy.get('#blogDiv-1').should('contain', 'ccc')
        cy.get('#blogDiv-2').should('contain', 'bbb')
        cy.get('#blogDiv-3').should('contain', 'aaa')
        cy.get('#blogDiv-3').contains('view').click()
        cy.get('#blogDiv-3').should('contain', 'likes 11')
      })
    })
  })
  // execise 5.21
  describe('blog test', function () {
    beforeEach(function () {
      const user2 = {
        name: 'pussy',
        username: 'pussy',
        password: '12345'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user2)
      cy.login({
        username: 'pussy',
        password: '12345'
      })
      cy.createBlog({
        title: 'you are not the only',
        author: 'not u',
        url: 'google.com'
      })
      cy.login({
        username: 'doggy',
        password: '12345'
      })
      cy.createBlog({
        title: 'you are my only',
        author: 'not u',
        url: 'google.com'
      })
    })

    it('user can delele their own post', function () {
      cy.contains('you are my only').as('thePost')
      cy.get('@thePost').contains('view').click()
      cy.get('@thePost').parent().get('#delBtn').click()
      cy.get('html').should('not.contain', 'you are my only')
    })
    it('user can not delele others post', function () {
      cy.contains('you are not the only').as('thePost')
      cy.get('@thePost').contains('view').click()
      cy.get('@thePost').should('not.contain', '#delBtn')
    })
  })

})