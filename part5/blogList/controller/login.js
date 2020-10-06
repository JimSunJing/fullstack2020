const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../modules/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, resp, next) => {
  try {
    const body = req.body
    const user = await User.findOne({ username: body.username })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return resp.status(401).json({
        error: 'username or password invalid.'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    resp.status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (err) {
    next(err)
  }
})

module.exports = loginRouter