const { Executor } = require('@alexthvest/commands')

// Converters imports
const UserConverter = require('./converters/user.converter')

// Commands imports
const ProbabilityCommand = require('./commands/probability.command')
const RandomTextCommand = require('./commands/randomText.command')
const HtmlCompilerCommand = require('./commands/htmlCompiler.command')

const BalanceCommand = require('./commands/balance.command')

// Middleware imports
const restMiddleware = require('./middleware/rest.middleware')

const executor = new Executor({
  converters: [
    new UserConverter()
  ],
  commands: [
    new ProbabilityCommand(),
    new RandomTextCommand(),
    new HtmlCompilerCommand(),

    new BalanceCommand()
  ]
})

// Middleware
executor.use(restMiddleware)

module.exports = executor