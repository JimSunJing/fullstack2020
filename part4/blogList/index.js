const loggers = require('./utils/loggers')
const config = require('./utils/config')
const http = require('http')
const app = require('./app')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  loggers.info(`Server running on port ${config.PORT}`)
})