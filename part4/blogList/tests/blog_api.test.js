const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../modules/blog')
const test_helper = require('./test_helper')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  // const blogObjs = helper.initialBlogs.map(b => new Blog(b))
  // const promiseArray = blogObjs.map(b => b.save())

  // await Promise.all(promiseArray)
  for (let blog of helper.initialBlogs) {
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

test('post save blog success', async () => {
  const newBlog = {
    title: '安藤忠雄',
    author: 'anten',
    url: 'https://www.google.com',
    likes: 23,
  }
  await api.post('/api/blogs')
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
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})