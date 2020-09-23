const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./modules/blog')
const config = require('./utils/config')
const middlewares = require('./utils/middlewares')

const mongoose = require('mongoose')
const loggers = require('./utils/loggers')
// const http = require('http')


loggers.info('connecting to', config.mongoUrl)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { loggers.info('connect to mongoDB success') })
  .catch((e) => {
    loggers.warning('connect to mongoDB error', e)
  })

app.use(cors())
app.use(express.json())
app.use(middlewares.requesLogger)

app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(err => next(err))
})

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))
})

app.use(middlewares.unknownEndpoint)

app.use(middlewares.errorHandler)

app.listen(config.PORT, () => {
  loggers.info(`Server running on port ${config.PORT}`)
})