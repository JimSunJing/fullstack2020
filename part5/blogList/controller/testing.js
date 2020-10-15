const router = require('express').Router()
const User = require('../modules/user')
const Blog = require('../modules/blog')

router.post('/reset', async (req, resp) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  resp.status(204).end()
})

module.exports = router