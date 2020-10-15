const logger = require('./loggers')

const requesLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('----------------')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// 替代express的原生错误处理器
const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Unauthorized'
    })
  }
  next(err)
}

const tokenExtractor = (req, resp, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    resp.locals.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  requesLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}