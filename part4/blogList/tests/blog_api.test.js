const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../modules/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjs = helper.initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjs.map(b => b.save())

  await Promise.all(promiseArray)
})

test('blogs return right amount', async () => {
  const blogs = await api.get('/api/blogs')

  expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})



afterAll(() => {
  mongoose.connection.close()
})