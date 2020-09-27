const blogsRouter = require('express').Router()
const Blog = require('../modules/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (req, resp, next) => {
  try {
    const body = req.body

    const blog2update = {
      likes: body.likes
    }
    const updated = await Blog.findByIdAndUpdate(req.params.id,
      blog2update, { new: true })
    resp.json(updated)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter