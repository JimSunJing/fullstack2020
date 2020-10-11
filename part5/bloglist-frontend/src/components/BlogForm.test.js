import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> submit with right detail', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const newBlog = {
    title: 'hello jest',
    author: 'jim',
    url: 'google.com'
  }

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: newBlog.title } })
  fireEvent.change(author, { target: { value: newBlog.author } })
  fireEvent.change(url, { target: { value: newBlog.url } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  // console.log(createBlog.mock.calls[0])
  expect(createBlog.mock.calls[0][0]).toEqual(newBlog)

})