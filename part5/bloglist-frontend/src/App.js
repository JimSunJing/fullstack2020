import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState('notify')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedBlogAppUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser',
        JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log('login error')
      showErrorMessage('wrong username or password!')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleCreate = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat(res))
      showMessage(`a new Blog has been added: ${res.title} by ${res.author}`)
    } catch (e) {
      console.log('create blog post error')
    }
  }

  const handleUpdate = async toUpdate => {
    try {
      const res = await blogService.update(toUpdate)
      setBlogs(blogs
        .filter(b => b.id !== toUpdate.id)
        .concat(res)
      )
    } catch (e) {
      console.log('update blog error...')
    }
  }

  const handleDelete = async toDelete => {
    try {
      await blogService.deleteBlog(toDelete)
      setBlogs(blogs.filter(b => b.id !== toDelete.id))
    } catch (e) {
      console.log('delet a blog error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit' id='login-button'>login</button>
    </form>
  )

  const logged = () => (
    <div>
      {user.name} logged in
      <button onClick={logout}>log out</button>
      <br></br>
      <Togglable buttonLabel='add blog'
        ref={blogFormRef}>
        <BlogForm
          createBlog={handleCreate} />
      </Togglable>
    </div>
  )

  const showErrorMessage = (msg) => {
    setMessage(msg)
    setClassName('error')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setClassName('notify')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} className={className} />

      {
        user === null
          ? loginForm()
          : logged()
      }

      {
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog, index) =>
            <Blog key={blog.id} blog={blog}
              num={index + 1}
              updateBlog={handleUpdate}
              currentUser={user}
              deleteBlog={handleDelete} />
          )
      }
    </div>
  )
}

export default App