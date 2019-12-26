const { Command } = require('@alexthvest/commands')
const User = require('../models/user.model')

module.exports = class BalanceCommand extends Command {
  patterns = ['баланс', 'balance']

  execute(args, ctx) {
    ctx.send(`Ваш баланс: ${ctx.user.money}$`)
  }
}