const { Command } = require('@alexthvest/commands')

module.exports = class BalanceCommand extends Command {
  patterns = ['баланс', 'balance']

  execute(args, ctx) {
    ctx.send(`Ваш баланс: ${ctx.user.money}$`)
  }
}