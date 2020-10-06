import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState('notify')

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

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const res = await blogService.create({
        title,
        author,
        url
      })
      setBlogs(blogs.concat(res))
      showMessage(`a new Blog has been added: ${res.title} by ${res.author}`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      console.log('create blog post error')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const logged = () => (
    <div>
      {user.name} logged in
      <button onClick={logout}>log out</button>

      <br></br>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

  const showErrorMessage = (msg) => {
    setMessage(msg)
    setClassName('error')
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setClassName('notify')
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} className={className} />

      { user === null
        ? loginForm()
        : logged()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App