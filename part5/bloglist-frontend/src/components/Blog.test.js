import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
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

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        currentUser={user}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog} />
    )
  })

  test('has no url and likes at beginning', () => {
    expect(component
      .container
      .querySelector('.blogDiv'))
      .toHaveTextContent('aaa bbb')
    expect(component
      .container
      .querySelector('.urlAndLikes'))
      .toHaveStyle('display: none')
  })

  test('url and likes show when clicked', () => {
    const view = component.getByText('view')
    fireEvent.click(view)

    const urlAndLikes = component
      .container
      .querySelector('.urlAndLikes')

    expect(urlAndLikes).not.toHaveStyle('display: none')
    expect(urlAndLikes.querySelector('.url'))
      .toHaveTextContent('google.com')
    expect(urlAndLikes.querySelector('.likes'))
      .toHaveTextContent('likes 17')
  })
})