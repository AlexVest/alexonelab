const winston = require('winston')

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${__dirname}/../../logs/messages.log`
    }),
    new winston.transports.File({
      filename: `${__dirname}/../../logs/errors.log`,
      level: 'error'
    })
  ]
})