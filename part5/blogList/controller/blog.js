const blogsRouter = require('express').Router()
const Blog = require('../modules/blog')
const User = require('../modules/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = req => {
//   const authorization = req.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')){
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', {
        username: 1,
        name: 1,
        id: 1
      })
    response.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const token = response.locals.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      response.status(401)
        .json({ error: 'invalid or missed token' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      ...body,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const blog = await Blog.findById(id)

    const token = response.locals.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    // console.log(decodedToken)
    if (!token || !(decodedToken.id === blog.user.toString())) {
      response.status(401)
        .json({ error: 'have no permition to delete' })
    }
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