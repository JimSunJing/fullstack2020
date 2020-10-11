import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('<Blog /> has no url and likes at beginning', () => {

  const blog = {
    title: 'aaa',
    author: 'bbb',
    url: 'google.com',
    likes: 17,
    user: {
      id: 'ie1gexhen12e1',
      username: 'fall'
    }
  }

  const user = {
    username: 'fall',
    name: 'summer'
  }

  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      currentUser={user}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog} />
  )

  const blogDiv = component.container.querySelector('.blogDiv')
  const url = component.container.querySelector('.urlAndLikes')

  expect(blogDiv).toHaveTextContent('aaa bbb')
  expect(url).toHaveStyle('display: none')
})