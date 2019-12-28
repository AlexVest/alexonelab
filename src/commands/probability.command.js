const { Command } = require('@alexthvest/commands')

module.exports = class ProbabilityCommand extends Command {
  patterns = ['вероятность', 'probability']
  params = {
    events: [String]
  }

  /**
   * Returns random number
   * @param {number} min 
   * @param {number} max 
   * @returns {number}
   */
  _randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  execute({ events }, ctx) {
    const event = events.join(' ')
    const percent = this._randomNumber(0, 100)

    ctx.send(`Вероятность ${event} равна ${percent}%`)
  }
}