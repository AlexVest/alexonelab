const { Command } = require('@alexthvest/commands')
const fetch = require('node-fetch').default

module.exports = class RandomImageCommand extends Command {
  url = 'http://neurovolk.xyz'
  patterns = ['img', 'image', 'картинка', 'цитата']
  
  async execute(args, ctx) {
    const response = await fetch(`${this.url}/?img=1`)
    const body = await response.text()
  
    const match = body.match('<img class="generated" src="(.*)"\/>')
    if (!match) return ctx.send('Не удалось найти изображение.')
  
    const image = `${this.url}/${match[1]}`
    await ctx.sendPhotos(image)
  }
}