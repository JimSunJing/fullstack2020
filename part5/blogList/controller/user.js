const bcrypt = require('bcrypt')
const User = require('../modules/user')
const userRouter = require('express').Router()

userRouter.get('/', async (req, resp, next) => {
  try {
    const users = await User.find({})
      .populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1
      })
    resp.json(users)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/', async (req, resp, next) => {
  const body = req.body

  // 判断密码是否符合要求
  if (body.password.length < 3 || body.username.length < 3) {
    return resp.status(400).json({
      error: 'username and password at lease 3 words long'
    })
  }

  const saltRounds = 17
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    resp.json(savedUser)
  } catch (err) {
    next(err)
  }

})

module.exports = userRouter