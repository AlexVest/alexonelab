const { Executor } = require('@alexthvest/commands')

// Commands imports
const ProbabilityCommand = require('./commands/probability.command')

// Middleware imports
const restMiddleware = require('./middleware/rest.middleware')

const executor = new Executor({
  commands: [
    new ProbabilityCommand()
  ]
})

// Middleware
executor.use(restMiddleware)

module.exports = executor