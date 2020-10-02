const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../modules/blog')
const User = require('../modules/user')
const bcrypt = require('bcrypt')
const test_helper = require('./test_helper')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User({
    username: 'Jim',
    name: 'joji',
    passwordHash: await bcrypt.hash('1234567', 17)
  })
  await user.save()
  // console.log('user:',user)

  for (let blog of helper.initialBlogs) {
    blog.user = user._id.toString()
    let blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('blogs return right amount', async () => {
  const blogs = await api.get('/api/blogs')
  // console.log(blogs)
  expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})

test('blog identifier is "id"', async () => {
  const blogs = await test_helper.fetchBlogsJson()
  expect(blogs[0].id).toBeDefined()
})

describe('blog actions need authorization', () => {
  let authorization = {}

  beforeEach(async () => {
    const loginForm = {
      username: 'Jim',
      password: '1234567'
    }

    const result = await api
      .post('/api/login')
      .send(loginForm)
      .expect(200)
    authorization = { Authorization: 'bearer ' + result.body.token }
  })

  test('post blog without authorization', async () => {
    const newBlog = {
      title: 'No Auth',
      author: 'fo',
      url: 'https://www.google.com',
      likes: 3,
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.fetchBlogsJson()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('post save blog success', async () => {
    const newBlog = {
      title: '安藤忠雄',
      author: 'anten',
      url: 'https://www.google.com',
      likes: 23,
    }
    await api.post('/api/blogs')
      .set(authorization)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.fetchBlogsJson()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[helper.initialBlogs.length].title).toBe(newBlog.title)
  })

  test('blog.likes set to 0 when absent', async () => {
    const newBlog = {
      title: '安藤忠雄222',
      author: 'anten',
      url: 'https://www.google.com',
    }
    await api.post('/api/blogs')
      .set(authorization)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.fetchBlogsJson()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    // console.log(blogsAtEnd[helper.initialBlogs.length])
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)
  })

  test('blog without title test', async () => {
    const newBlog = {
      author: 'jim',
      url: 'google.com',
      likes: 12
    }
    await api.post('/api/blogs')
      .set(authorization)
      .send(newBlog)
      .expect(400)
  })

  test('blog without url test', async () => {
    const newBlog = {
      author: 'jim',
      title: 'i do not have url',
      likes: 12
    }
    await api.post('/api/blogs')
      .set(authorization)
      .send(newBlog)
      .expect(400)
  })

  test('delete a blog by its id', async () => {
    const blogsAtStart = await helper.fetchBlogsJson()
    const id2del = blogsAtStart[0].id

    await api.delete(`/api/blogs/${id2del}`)
      .set(authorization)
      .expect(204)

    const blogsAtEnd = await helper.fetchBlogsJson()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

})


test('update a blog by its id', async () => {
  const blogsAtStart = await helper.fetchBlogsJson()
  const blog = {
    ...blogsAtStart[0],
    likes: blogsAtStart[0].likes + 7,
  }

  await api.put(`/api/blogs/${blog.id}`)
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.fetchBlogsJson()

  expect(blogsAtEnd.find(b => b.id === blog.id).likes).toBe(blog.likes)

})

afterAll(() => {
  mongoose.connection.close()
})