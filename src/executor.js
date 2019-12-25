const { Executor } = require('@alexthvest/commands')

// Commands imports
const ProbabilityCommand = require('./commands/probability.command')
const RandomTextCommand = require('./commands/randomText.command')
const HtmlCompilerCommand = require('./commands/htmlCompiler.command')

// Middleware imports
const restMiddleware = require('./middleware/rest.middleware')

const executor = new Executor({
  commands: [
    new ProbabilityCommand(),
    new RandomTextCommand(),
    new HtmlCompilerCommand()
  ]
})

// Middleware
executor.use(restMiddleware)

module.exports = executor