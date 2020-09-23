const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blog')
const middlewares = require('./utils/middlewares')
const mongoose = require('mongoose')
const loggers = require('./utils/loggers')
const config = require('./utils/config')

loggers.info('connecting to', config.mongoUrl)
mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { loggers.info('connect to mongoDB success') })
  .catch((e) => {
    loggers.warning('connect to mongoDB error', e)
  })

app.use(cors())
app.use(express.json())
app.use(middlewares.requesLogger)

app.use('/api/blogs', blogsRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app