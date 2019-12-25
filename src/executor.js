const { Executor } = require('@alexthvest/commands')

// Commands imports
const ProbabilityCommand = require('./commands/probability.command')
const RandomImageCommand = require('./commands/randomImage.command')
const RandomTextCommand = require('./commands/randomText.command')

// Middleware imports
const restMiddleware = require('./middleware/rest.middleware')

const executor = new Executor({
  commands: [
    new ProbabilityCommand(),
    new RandomImageCommand(),
    new RandomTextCommand()
  ]
})

// Middleware
executor.use(restMiddleware)

module.exports = executor